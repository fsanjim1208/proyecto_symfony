<?php

namespace App\Controller\Disposicion;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Disposicion;
use App\Entity\Juego;
use App\Entity\Tramo;
use App\Repository\JuegoRepository;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;


    class DisposicionController extends AbstractController
    {
        // Include the paginator through dependency injection, the autowire needs to be enabled in the project
        public function __construct(private ManagerRegistry $doctrine) {}
        
        
        #[Route('/disposicion' , name:"app_disposicion")]
        public function index(Request $request,ManagerRegistry $doctrine)
        {
            return $this->render('disposicion.html.twig');
        }
    }