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
 

    class MiController extends AbstractController
    {

        public function __construct(private ManagerRegistry $doctrine) {}


        #[Route('/home', name: 'app_home')]
        public function home(  Request $request):response
        {
            return $this->render('main/home.html.twig');
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


        #[Route('/juegos')]
        public function juegos( Request $request):response
        {
        
            $juegos = $this->doctrine
            ->getRepository(Juego::class)
            ->findAll();
            return $this->render('juegos.html.twig',['juegos'=>$juegos]);
        }
        

        #[Route('/listadosJuegos' , name:"app_listado_juegos")]
        public function mantejuegos()
        {

            $juegos = $this->doctrine
            ->getRepository(Juego::class)
            ->findAll();
    
            return $this->render('listados/listadosJuegos.html.twig',['juegos' => $juegos]);
        }

        // #[Route('/editaJuegos/{id}' , name:"app_edita_juegos")]
        // public function editajuegos($id)
        // {

        //     $juego = $this->doctrine
        //     ->getRepository(Juego::class)
        //     ->find($id);
    
        //     return $this->render('Editar/editaJuegos.html.twig',['juego' => $juego]);
        // }



        #[Route('/juegos2' , name:"listados", methods:"GET")]
        public function indexAction($currentPage = 1)
        {

            $limit = 1;
            $juegos = $this->doctrine
            ->getRepository(Juego::class)
            ->getAllPers($currentPage, $limit);
            
            $juegosResultado = $juegos['paginator'];
            $juegosQueryCompleta =  $juegos['query'];

            $maxPages = ceil($juegos['paginator']->count() / $limit);

            return $this->render('juegos2.html.twig', array(
                    'juego' => $juegos,
                    'juegos' => $juegosResultado,
                    'maxPages'=>$maxPages,
                    'thisPage' => $currentPage,
                    'all_items' => $juegosQueryCompleta
                ) );
        }
    }
?>