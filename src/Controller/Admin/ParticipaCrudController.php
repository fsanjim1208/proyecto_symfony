<?php

namespace App\Controller\Admin;

use App\Entity\Participa;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;

class ParticipaCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Participa::class;
    }

    /*
    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id'),
            TextField::new('title'),
            TextEditorField::new('description'),
        ];
    }
    */
}
