<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Juego;
use App\Form\JuegoType;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\String\Slugger\SluggerInterface;
use Knp\Component\Pager\PaginatorInterface;

class JuegoController extends AbstractController
{

    public function __construct(private ManagerRegistry $doctrine) {}

    #[Route('/juegos' , name:"app_listado_juegos")]
    public function juegos( Request $request,PaginatorInterface $paginator):response
    {
    
        $juegos = $this->doctrine
        ->getRepository(Juego::class)
        ->findAll();

        $juegos = $paginator->paginate($juegos, $request->query->getInt('page', 1),4);

        return $this->render('juego/listadoJuegos.html.twig',['juegos'=>$juegos]);
    }

    //ruta para mostrar todos los juegos paginados y poder modificarlos
    #[Route('/listadosJuegos' , name:"app_mantenimiento_juegos")]
    public function mantejuegos(Request $request,ManagerRegistry $doctrine, PaginatorInterface $paginator)
    {

        $juegos = $this->doctrine
        ->getRepository(Juego::class)
        ->findAll();

        $juegos = $paginator->paginate($juegos, $request->query->getInt('page', 1),4);


        return $this->render('juego/mantenimientoJuegos.html.twig',['juegos' => $juegos]);
    }

    //ruta para editar un juego
    #[Route('/editaJuegos/{id}' , name:"app_edita_juegos")]
    public function new( $id, Request $request, ManagerRegistry $doctrine, SluggerInterface $slugger): Response
    {
        $entityManager= $doctrine->getManager();
        $juego = $this->doctrine
        ->getRepository(Juego::class)
        ->find($id);

        $img = $juego->getImg();
        // $juego = new Juego();

        $form = $this->createForm(JuegoType::class, $juego,[
            'method' => 'post',
        ]);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $juegomodificado = $form->getData();
        
            $rutaimagen = $form->get('img')->getData();
            
            $juegomodificado->setImg($img);
            
            if ($rutaimagen) {
                // dd($rutaimagen);
                $originalFilename = pathinfo($rutaimagen->getClientOriginalName(), PATHINFO_FILENAME);
                // this is needed to safely include the file name as part of the URL
                $safeFilename = $slugger->slug($originalFilename);
                // $newFilename = 'Imagenes/juego/'.$safeFilename.'-'.uniqid().'.'.$rutaimagen->guessExtension();
                $newFilename = 'Imagenes/juego/'.$safeFilename.'.'.$rutaimagen->guessExtension();

                
                try {
                    $rutaimagen->move(
                        $this->getParameter('img_directory_juego'),
                        $newFilename
                    );
                } catch (FileException $e) {
                    // ... handle exception if something happens during file upload
                }

                $juegomodificado->setImg($newFilename);
            }


            $entityManager->persist($juegomodificado);
            $entityManager->flush();

            // $ProductoRepository= new ProductoRepository($doctrine);
            // $ProductoRepository->save($producto);

            return $this->redirect($this->generateUrl('app_mantenimiento_juegos'));
        }

        return $this-> render('juego/editaJuego.html.twig',[
            'form' => $form,
            'juego' => $juego,
        ]);
    }

    #[Route('/juego', name: 'app_crea_juego')]
    public function index(Request $request,ManagerRegistry $doctrine,SluggerInterface $slugger): Response
    {

        $entityManager= $doctrine->getManager();

        $juego = new Juego();
        $form = $this->createForm(JuegoType::class, $juego);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $juegoModificado = $form->getData();

            $rutaimagen = $form->get('img')->getData();

            if ($rutaimagen) {

                $originalFilename = pathinfo($rutaimagen->getClientOriginalName(), PATHINFO_FILENAME);
                // this is needed to safely include the file name as part of the URL
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = 'Imagenes/juego/'.$safeFilename.'.'.$rutaimagen->guessExtension();

                
                try {
                    $rutaimagen->move(
                        $this->getParameter('img_directory_juego'),
                        $newFilename
                    );
                } catch (FileException $e) {
                    // ... handle exception if something happens during file upload
                }

                $juegoModificado->setImg($newFilename);
            }

            $entityManager->persist($juegoModificado);
            $entityManager->flush();

            // $ProductoRepository= new ProductoRepository($doctrine);
            // $ProductoRepository->save($producto);

            return $this->redirect($this->generateUrl('app_listado_juegos'));
        }

        return $this->render('juego/creaJuego.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
