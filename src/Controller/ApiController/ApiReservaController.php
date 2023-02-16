<?php
 
namespace App\Controller\ApiController;
 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Reserva;
use App\Entity\Juego;
use App\Entity\Mesa;
use App\Entity\Tramo;
use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
 

#[Route('/api',name:"api_")]
class ApiReservaController extends AbstractController
{

    public function __construct(private ManagerRegistry $doctrine) {}



    #[Route('/reserva',name:"reserva_index", methods:"GET")]
    public function index(): Response
    {
        $reservas = $this->doctrine
                        ->getRepository(Reserva::class)
                        ->findAll();
 
        $arrayReservas = [];

        if(!$reservas){
            return $this->json("No hay reservas", 404);
        }
        
        foreach ($reservas as $reserva) {
            $arrayReservas[] = [
                'id' => $reserva->getId(),
                'fecha' => $reserva->getFechaInicio(),
                'idTramo' => $reserva->getTramo()->getId(),
                'idJuego' => $reserva->getJuego()->getId(),
                'idMesa' => $reserva->getMesa()->getId(),
                'idUser' => $reserva->getUsuario()->getId(),
                
            ];
        }
        
        return $this->json($arrayReservas);
    }

    #[Route('/reserva/{id}',name:"reserva_show", methods:"GET")]
    public function show_reserva(int $id): Response
    {
        $reservas = $this->doctrine
                        ->getRepository(Reserva::class)
                        ->findOneById($id);
 
        

        if(!$reservas){
            return $this->json("No hay reservas", 404);
        }
        
        $reserva=[];

        
            $reserva[] =[ 
                'id' => $reservas->getId(),
                'fecha' => $reservas->getFechaInicio(),
                'idTramo' => $reservas->getTramo()->getId(),
                'idJuego' => $reservas->getJuego()->getId(),
                'idMesa' => $reservas->getMesa()->getId(),
                'idUser' => $reservas->getUsuario()->getId(),
                
        ];
        
        
        return $this->json($reserva);
    }

    // #[Route('/festivo/{id}',name:"festivo_update", methods:"PUT")]
    // public function edit(Request $request, int $id): Response
    // {
    //     $entityManager = $this->doctrine->getManager();
    //     $festivo = $entityManager->getRepository(Festivo::class)->find($id);
    //     //var_dump($producto);
    //     if (!$festivo) {
    //         return $this->json('No se encuentran festivos por esa id:  ' . $id, 404);
    //     }
 
    //     $festivo->setDay($request->request->get('day'));
    //     $festivo->setMonth($request->request->get('month'));
    //     $festivo->setYear($request->request->get('year'));
    //     $festivo->setDescripcion($request->request->get('descripcion'));
        
    //     $entityManager->persist($festivo);
    //     $entityManager->flush();

    //     $arrayfestivos[] = [
    //         'id' => $festivo->getId(),
    //         'day' => $festivo->getDay(),
    //         'month' => $festivo->getMonth(),
    //         'year' => $festivo->getYear(),
    //         'descripcion' => $festivo->getDescripcion(),
    //     ];
         
    //     return $this->json($arrayfestivos);
    // }

    #[Route('/reserva',name:"reserva_new", methods:"POST")]
    public function new(Request $request): Response
    {
        $entityManager = $this->doctrine->getManager();
        
        $juego = $this->doctrine
        ->getRepository(Juego::class)
        ->findByName($request->request->get('juego'));
        //->findByName("Monopoly");

        $tramo = $this->doctrine
        ->getRepository(Tramo::class)
        ->findOneByIncio(explode("-",$request->request->get('tramo'))[0]);
        // ->findOneByIncio(explode("-","08:00:00 - 09:00:00")[0]);
        // dd($tramo);
        $mesa = $this->doctrine
        ->getRepository(Mesa::class)
        ->findOneById(explode("_",$request->request->get('mesa'))[1]);
        // ->findOneById(1);

        $dia=explode("/",$request->request->get('fecha'))[0];
        $mes=explode("/",$request->request->get('fecha'))[1];
        $anio=explode("/",$request->request->get('fecha'))[2];

        // $dia=explode("/","12/12/12")[0];
        // $mes=explode("/","12/12/12")[1];
        // $anio=explode("/","12/12/12")[2];

        $fecha= $anio."-".$mes."-".$dia;

        

        $reserva = new Reserva();
        $reserva->setFechaInicio($fecha);
        $reserva->setTramo($tramo);
        $reserva->setJuego($juego);
        $reserva->setMesa($mesa);
        $reserva->setUsuario($this->getUser());


        $entityManager->persist($reserva);
        $entityManager->flush();
        // dd($reserva);
        return $this->json('Creada la reserva con id ' . $reserva->getId());
    }


    // #[Route('/festivo/{id}',name:"festivo_show2", methods:"PUT")]
    // public function edit(Request $request, int $id): Response
    // {
    //     $entityManager = $this->doctrine->getManager();
    //     $festivo = $entityManager->getRepository(Festivo::class)->find($id);
    //     //var_dump($producto);
    //     if (!$festivo) {
    //         return $this->json('No se encuentran festivos por esa id:  ' . $id, 404);
    //     }
 
    //     $festivo->setAncho($request->request->get('ancho'));
    //     $festivo->setAlto($request->request->get('alto'));
    //     $festivo->setX($request->request->get('x'));
    //     $festivo->setY($request->request->get('y'));
    //     $festivo->setImagen($request->request->get('imagen'));
        
    //     $entityManager->persist($festivo);
    //     $entityManager->flush();

    //     $arrayfestivos[] = [
    //         'id' => $festivo->getId(),
    //         'ancho' => $festivo->getAncho(),
    //         'alto' => $festivo->getAlto(),
    //         'x' => $festivo->getX(),
    //         'y' => $festivo->getY(),
    //         'imagen' => $festivo->getImagen(),
    //     ];
         
    //     return $this->json($arrayfestivos);
    // }
 


    // 

    #[Route('/reserva/{id}',name:"reserva_delete", methods:"DELETE")]
    public function delete(int $id): Response
    {
        $entityManager = $this->doctrine->getManager();
        $reserva = $entityManager->getRepository(Reserva::class)->find($id);
 
        if (!$reserva) {
            return $this->json('No project found for id' . $id, 404);
        }
 
        $entityManager->remove($reserva);
        $entityManager->flush();
 
        return $this->json('reserva eliminada correctamente with id ' . $id);
    }
 
       
 
 
 
}