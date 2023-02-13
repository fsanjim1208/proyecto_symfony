<?php

namespace App\Controller\paginator;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Juego;

use Doctrine\Persistence\ManagerRegistry;

// Include paginator interface
use Knp\Component\Pager\PaginatorInterface;

    class paginatorController extends AbstractController
    {
        // Include the paginator through dependency injection, the autowire needs to be enabled in the project
        // public function __construct(private ManagerRegistry $doctrine) {}
        
        // #[Route('/paginacion' , name:"paginacion")]
        #[Route('/pagina' , name:"app_pagina")]
        public function index(Request $request,ManagerRegistry $doctrine, PaginatorInterface $paginator)
        {
            // Retrieve the entity manager of Doctrine
            $em =  $doctrine->getManager();
            // Get some repository of data, in our case we have an Appointments entity
            $appointmentsRepository = $em->getRepository(Juego::class);
                    
            // Find all the data on the Appointments table, filter your query as you need
            $allAppointmentsQuery = $appointmentsRepository->createQueryBuilder('p')
                ->where('p.status != :status')
                ->setParameter('status', 'canceled')
                ->getQuery();
            
            
    
            // Paginate the results of the query
            $appointments = $paginator->paginate(
                // Doctrine Query, not results
                $allAppointmentsQuery,
                // Define the page parameter
                $request->query->getInt('page', 1),
                // Items per page
                5
            );
            
            // Render the twig view
            return $this->render('default/index.html.twig', [
                'appointments' => $appointments
            ]);
        }
    }