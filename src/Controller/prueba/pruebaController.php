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

                // dd($producto);
                if ($form->get('img')->getData() == null){

                }
                else{
                    $rutaimagen = $form->get('img')->getData();

                    // this condition is needed because the 'brochure' field is not required
                    // so the PDF file must be processed only when a file is uploaded
                    if ($rutaimagen) {
                        $originalFilename = pathinfo($rutaimagen->getClientOriginalName(), PATHINFO_FILENAME);
                        // this is needed to safely include the file name as part of the URL
                        $safeFilename = $slugger->slug($originalFilename);
                        $newFilename = $safeFilename.'-'.uniqid().'.'.$rutaimagen->guessExtension();
    
                        // Move the file to the directory where brochures are stored
                        try {
                            $rutaimagen->move(
                                $this->getParameter('img_directory'),
                                $newFilename
                            );
                        } catch (FileException $e) {
                            // ... handle exception if something happens during file upload
                        }
    
                        // updates the 'brochureFilename' property to store the PDF file name
                        // instead of its contents
                        $producto->setImagen($newFilename);
                    }
    
                    $entityManager->persist($juego);
                    $entityManager->flush();
                }
                

                // $ProductoRepository= new ProductoRepository($doctrine);
                // $ProductoRepository->save($producto);
    
                return $this->redirectToRoute('app_home');

                // $file = $juego->getImg();

                // // Generar un numbre único para el archivo antes de guardarlo
                // $fileName = md5(uniqid()).'.'.$file->guessExtension();

                // // Mover el archivo al directorio donde se guardan los curriculums
                // $cvDir = $this->container->getparameter('kernel.root_dir').'/../web/uploads/cv';
                // $file->move($cvDir, $fileName);

                // // Actualizar la propiedad curriculum para guardar el nombre de archivo PDF
                // // en lugar de sus contenidos
                // $juego->setImg($fileName);

            // ... persist la variable $usuario o cualquier otra tarea

            return $this->redirect($this->generateUrl('app_product_list'));
        }
            // return $this->render('producto.html.twig', [
            //     'form' => $form,
            
            //]);
            // return $this->render('Editar/editaJuegos.html.twig',['juego' => $juego]);
            return $this-> render('prueba/prueba.html.twig',[
                'form' => $form,
                'juego' => $juego,
            ]);
        }
    }