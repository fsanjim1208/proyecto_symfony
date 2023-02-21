<?php
namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Mesa;
use App\Entity\Juego;
use App\Entity\Tramo;
use App\Repository\JuegoRepository;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;

    class MiController extends AbstractController
    {

        public function __construct(private ManagerRegistry $doctrine) {}

        #[Route('/eo', name: 'eo')]
        public function index(): Response
        {
            return $this->render('eo/eo.html.twig', [
                'controller_name' => 'MainController',
            ]);
        }

        #[Route('/home', name: 'app_home')]
        public function home(  Request $request,ManagerRegistry $doctrine):response
        {

            $entityManager= $doctrine->getManager();
            $juego1 = $this->doctrine
            ->getRepository(Juego::class)
            ->findOneById(6);

            $entityManager= $doctrine->getManager();
            $juego2 = $this->doctrine
            ->getRepository(Juego::class)
            ->findOneById(8);

            $entityManager= $doctrine->getManager();
            $juego3 = $this->doctrine
            ->getRepository(Juego::class)
            ->findOneById(3);

            $entityManager= $doctrine->getManager();
            $juego4 = $this->doctrine
            ->getRepository(Juego::class)
            ->findOneById(2);



            return $this->render('main/home.html.twig',[
                'juego1' => $juego1,
                'juego2' => $juego2,
                'juego3' => $juego3,
                'juego4' => $juego4,
            ]);
        }



        #[Route('/homes')]
        public function homes(  Request $request):response
        {

            $mesa = $this->doctrine
            ->getRepository(Mesa::class)
            ->find(1);
            return $this->render('mesas.html.twig',['mesa'=>$mesa]);
        }

        #[Route('/mesas')]
        public function mesas( Request $request):response
        {
        
            return $this->render('mesas.html.twig');
        }

        
        #[Route('/reserva', name:"reserva")]
        public function reserva( Request $request):response
        {
            $tramos = $this->doctrine
            ->getRepository(Tramo::class)
            ->findAll();

            $juegos = $this->doctrine
            ->getRepository(Juego::class)
            ->findAll();

            return $this->render('reserva.html.twig',['tramos'=>$tramos ,'juegos'=>$juegos]);
        }


        
        

        

        // #[Route('/editaJuegos/{id}' , name:"app_edita_juegos")]
        // public function editajuegos($id)
        // {

        //     $juego = $this->doctrine
        //     ->getRepository(Juego::class)
        //     ->find($id);
    
        //     return $this->render('Editar/editaJuegos.html.twig',['juego' => $juego]);
        // }

    }
?>