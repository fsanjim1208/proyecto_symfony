<?php
namespace App\Controller\prueba;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Juego;
use App\Repository\JuegoRepository;
use App\Form\JuegoType;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\String\Slugger\SluggerInterface;
use Knp\Component\Pager\PaginatorInterface;

    class pruebaController extends AbstractController
    {
        public function __construct(private ManagerRegistry $doctrine) {}


        #[Route('/editaJuegos/{id}' , name:"app_edita_juegos")]
        public function new( $id, Request $request, ManagerRegistry $doctrine, SluggerInterface $slugger): Response
        {
            $entityManager= $doctrine->getManager();
            $juego = $this->doctrine
            ->getRepository(Juego::class)
            ->find($id);

            // $juego = new Juego();
    
            $form = $this->createForm(JuegoType::class, $juego,[
                'method' => 'post',
            ]);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $juego = $form->getData();

                $rutaimagen = $form->get('img')->getData();

                if ($rutaimagen) {
                    $originalFilename = pathinfo($rutaimagen->getClientOriginalName(), PATHINFO_FILENAME);
                    // this is needed to safely include the file name as part of the URL
                    $safeFilename = $slugger->slug($originalFilename);
                    $newFilename = 'Imagenes/juego/'.$safeFilename.'-'.uniqid().'.'.$rutaimagen->guessExtension();

                    
                    try {
                        $rutaimagen->move(
                            $this->getParameter('img_directory_juego'),
                            $newFilename
                        );
                    } catch (FileException $e) {
                        // ... handle exception if something happens during file upload
                    }

                    $juego->setImg($newFilename);
                }

                $entityManager->persist($juego);
                $entityManager->flush();

                // $ProductoRepository= new ProductoRepository($doctrine);
                // $ProductoRepository->save($producto);
    
                return $this->redirect($this->generateUrl('app_listado_juegos'));
            }

            return $this-> render('prueba/prueba.html.twig',[
                'form' => $form,
                'juego' => $juego,
            ]);
        }
    }