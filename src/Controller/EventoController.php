<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Evento;
use App\Entity\User;
use App\Entity\Participa;
use App\Form\EventoType;
use App\Form\ParticipaType;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\String\Slugger\SluggerInterface;
use Knp\Component\Pager\PaginatorInterface;
use Telegram\Bot\Api;


class EventoController extends AbstractController
{

    public function __construct(private ManagerRegistry $doctrine) {}

    #[Route('/evento', name: 'app_crea_evento')]
    public function index(Request $request,ManagerRegistry $doctrine,SluggerInterface $slugger): Response
    {

        $entityManager= $doctrine->getManager();

        $evento = new Evento();
        $form = $this->createForm(EventoType::class, $evento);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $juego = $form->getData();

            $rutaimagen = $form->get('img')->getData();

            if ($rutaimagen) {

                $originalFilename = pathinfo($rutaimagen->getClientOriginalName(), PATHINFO_FILENAME);
                // this is needed to safely include the file name as part of the URL
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = 'Imagenes/evento/'.$safeFilename.'-'.uniqid().'.'.$rutaimagen->guessExtension();

                
                try {
                    $rutaimagen->move(
                        $this->getParameter('img_directory_evento'),
                        $newFilename
                    );
                } catch (FileException $e) {
                    // ... handle exception if something happens during file upload
                }

                $juego->setImg($newFilename);
            }

            $entityManager->persist($evento);
            $entityManager->flush();

            // $ProductoRepository= new ProductoRepository($doctrine);
            // $ProductoRepository->save($producto);

            return $this->redirect($this->generateUrl('app_listado_evento'));
        }

        return $this->render('evento/creaEvento.html.twig', [
            'controller_name' => 'EventoController',
            'form' => $form->createView(),
        ]);
    }

    #[Route('/listadoEvento', name: 'app_listado_evento')]
    public function listdoEvento(Request $request,ManagerRegistry $doctrine): Response
    {

        $entityManager= $doctrine->getManager();
            $eventos = $this->doctrine
            ->getRepository(Evento::class)
            ->findAll();

        return $this->render('evento/listadosEvento.html.twig', [
            'evento' => $eventos,

        ]);
    }

    #[Route('/mantenimientoEvento', name: 'app_mantenimiento_evento')]
    public function manteEvento(Request $request,ManagerRegistry $doctrine): Response
    {

        $entityManager= $doctrine->getManager();
            $eventos = $this->doctrine
            ->getRepository(Evento::class)
            ->findAll();

        return $this->render('evento/mantenimientoEvento.html.twig', [
            'evento' => $eventos,

        ]);
    }

    #[Route('/editaEvento/{id}', name: 'app_edita_evento')]
    public function editaEvento(int $id, Request $request,ManagerRegistry $doctrine,SluggerInterface $slugger): Response
    {

        $entityManager= $doctrine->getManager();
        $evento = $this->doctrine
            ->getRepository(Evento::class)
            ->findOneById($id);

        $img= $evento->getImg();

        $form = $this->createForm(EventoType::class, $evento,[
           'method' => 'post',
        ]);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $eventomodificado = $form->getData();



            $rutaimagen = $form->get('img')->getData();
            
            $eventomodificado->setImg($img);
            if ($rutaimagen) {
                $originalFilename = pathinfo($rutaimagen->getClientOriginalName(), PATHINFO_FILENAME);
                // this is needed to safely include the file name as part of the URL
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = 'Imagenes/evento/'.$safeFilename.'('.$eventomodificado->getNombre().').'.$rutaimagen->guessExtension();

                
                try {
                    $rutaimagen->move(
                        $this->getParameter('img_directory_evento'),
                        $newFilename
                    );
                } catch (FileException $e) {
                    // ... handle exception if something happens during file upload
                }

                $eventomodificado->setImg($newFilename);
            }

            $entityManager->persist($eventomodificado);
            $entityManager->flush();

            // $ProductoRepository= new ProductoRepository($doctrine);
            // $ProductoRepository->save($producto);

            return $this->redirect($this->generateUrl('app_mantenimiento_evento'));
        }
        
        return $this->render('evento/editaEvento.html.twig', [
            'evento' => $evento,
            'form' => $form,
        ]);
    }

    #[Route('/invitaUsu/{idEvento}', name: 'app_invitaUsu_evento')]
    public function invitaUsu(int $idEvento, Request $request,ManagerRegistry $doctrine,PaginatorInterface $paginator,MailerInterface $mailer,Api $telegram): Response
    {

        $entityManager= $doctrine->getManager();
        $evento = $this->doctrine
        ->getRepository(Evento::class)
        ->findOneById($idEvento);

        $participa= new Participa();

        $participaciones = $this->doctrine
        ->getRepository(Participa::class)
        ->findByEventoId($idEvento);

        $usuarios = $this->doctrine
        ->getRepository(User::class)
        ->findAll();
        // $usuarios = $paginator->paginate($usuario, $request->query->getInt('page', 1),5);
        $form = $this->createForm(ParticipaType::class, $participa);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            
            $participacionEvento=  $this->doctrine
                    ->getRepository(Participa::class)
                    ->findByEventoId($idEvento);
            

            if($participacionEvento){
                for ($i=0; $i < count($participacionEvento); $i++) { 
                    $userParticipacion[]=$participacionEvento[$i]->getUser()->getId();
                }
            }

            $usuarios=$request->get("usus");
            

            if ($usuarios){
                $noEsta=0;
                for ($i=0; $i < count($usuarios) ; $i++) { 
                    
                    
                    for ($j=0; $j < count($userParticipacion); $j++) { 
                        if($usuarios[$i] == $userParticipacion[$j]){
                            $noEsta=0;
                            break;
                        }
                        else{
                            $noEsta=$noEsta +1;
                        }
                    }
                    if($noEsta == count($userParticipacion))
                    {
    
                        $user= $this->doctrine
                            ->getRepository(User::class)
                            ->findOneById($usuarios[$i]);
    
                        $participacion= new Participa();
                        $participacion->setEvento($evento);
                        $participacion->setUser($user);
                        $participacion->setCodInvitacion(uniqid());
                        // dd($participacion);
                        $entityManager->persist($participacion);
                        $entityManager->flush();

                        $email = (new Email())
                        ->from('proyectosymfonyjuegos@gmail.com')
                        ->to($user->getEmail())
                        //->cc('cc@example.com')
                        //->bcc('bcc@example.com')
                        //->replyTo('fabien@example.com')
                        //->priority(Email::PRIORITY_HIGH)
                        ->subject('Invitacion al evento al evento')
                        ->html('<p> Usted ha sido invitado al evento, se le proporcionara un codigo, por favor no lo pierda, se le pedirá a la entrada</p>
                                <p>Codigo de invitacion: <b>'.$participacion->getCodInvitacion().'</b></p>');

                        $mailer->send($email);

                        $mensaje = new Api('6275526786:AAGx_6Yr-GvYRtW-slSFCDxKaf32mfyRhdo');
                        // Enviar el mensaje utilizando la API de Telegram
        
                        $mensaje->sendMessage([
                            'chat_id' => $user->getIdTelegram(),
                            'text' => 'Usted ha sido invitado a participar en el evento '.$evento->getNombre().' con el codigo de invitacion: '.$participacion->getCodInvitacion().'. Por favor no lo pierda.',
                        ]);

                        $noEsta=0;
                    }
                }
            }

            if($participacionEvento){
                for ($i=0; $i < count($participacionEvento); $i++) { 
                    $newUserParticipacion[]=$participacionEvento[$i]->getUser()->getId();
                }
            }
            $borrar=0;
            for ($i=0; $i < count($newUserParticipacion); $i++) { 
                for ($j=0; $j < count($usuarios); $j++) { 

                    if($newUserParticipacion[$i] == $usuarios[$j])
                    {
                        $borrar=0;
                        break;
                    }
                    else{
                        $borrar=$borrar +1;
                    }
                }
                if($borrar == count($usuarios)){
                    $user2= $this->doctrine
                    ->getRepository(User::class)
                    ->findOneById($newUserParticipacion[$i]);
                
                    $participacionEliminar=  $this->doctrine
                        ->getRepository(Participa::class)
                        ->findOneByEventoAndUser($idEvento, $user2);
                    //dd($participacionEliminar);
                    $entityManager->remove($participacionEliminar);
                    $entityManager->flush();
                }
                    $borrar=0;
                
            }
            

            return $this->redirect($this->generateUrl('app_mantenimiento_evento'));
        }

        return $this->render('evento/invitacionUsuarios.html.twig', [
            'user' => $usuarios,
            'form' => $form,
            'evento' => $evento,
            'participaciones' => $participaciones,

        ]);
    }
}
