<?php

namespace App\Controller\Admin;

use App\Entity\Evento;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\Field;
     
use Doctrine\Persistence\ManagerRegistry;
use EasyCorp\Bundle\EasyAdminBundle\Field\IntegerField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud; 

use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;   
class EventoCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Evento::class;
    }

    public function __construct(private ManagerRegistry $doctrine) {}



    public function configureFields(string $pageName): iterable
    {
        $entityManager = $this->doctrine->getManager();
        $user = $entityManager->getRepository(User::class)->findAll();
        // dd($user);
        if (Crud::PAGE_EDIT == $pageName){
            return[
                'nombre',
                'descripcion',
                // ChoiceField::new('usuarios')->setChoices($user)->allowMultipleChoices(),
            ];
        }
        return [
            TextField::new('nombre'),
            TextField::new('descripcion'),
        ];
    }
    
}
