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



    }