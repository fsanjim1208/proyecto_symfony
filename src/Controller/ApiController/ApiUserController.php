<?php
 
namespace App\Controller\ApiController;
 
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\User;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\User\PasswordUpgraderInterface;
 

#[Route('/api',name:"api_")]
class ApiUserController extends AbstractController
{

    public function __construct(private ManagerRegistry $doctrine) {}

    #[Route('/user/{email}',name:"user_update", methods:"PUT")]
    public function userEdit(Request $request,$email): Response
    {
        $entityManager = $this->doctrine->getManager();
        $user = $entityManager->getRepository(User::class)->findOneByEmail($email);
 
        $user->setNombre($request->request->get('nombre'));
        $user->setApellido1($request->request->get('apellido1'));
        $user->setApellido2($request->request->get('apellido2'));
        $user->setIdTelegram($request->request->get('telegram'));
        $entityManager->persist($user);
        $entityManager->flush();    

        $usu = [
            'id' => $user->getId(),
            'email' => $user->getEmail(),
            'apellido1' => $user->getapellido1(),
            'apellido2' => $user->getApellido2(),
            'telegram' => $user->getIdTelegram(),
            // 'imagen' => $mesa->getImagen(),
        ];
         
        return $this->json(['Guardado el usuario con id: ' ,'codigo: 201',$usu],201);
    }

    
}