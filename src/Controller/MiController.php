<?php
namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Mesa;
use Doctrine\Persistence\ManagerRegistry;
 

    class MiController extends AbstractController
    {

        public function __construct(private ManagerRegistry $doctrine) {}

        #[Route('/home')]
        public function home(  Request $request):response
        {

            $mesa = $this->doctrine
            ->getRepository(Mesa::class)
            ->find(1);




            return $this->render('mesas.html.twig',['mesa'=>$mesa]);
        }
    }
?>