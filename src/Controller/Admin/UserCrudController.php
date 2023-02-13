<?php

namespace App\Controller\Admin;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Crud; 
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;      
use EasyCorp\Bundle\EasyAdminBundle\Field\BooleanField;      
 

class UserCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    
    public function configureFields(string $pageName): iterable
    {

        if (Crud::PAGE_EDIT == $pageName){
            return[
                'Nombre',
                'Email',
                ChoiceField::new('roles')->setChoices(['ADMIN' => 'ROLE_ADMIN', 'USER' => 'ROLE_USER'])->allowMultipleChoices(),
            ];
        }
        return [
            
            'Nombre',
            'Apellido1',
            'Apellido2',
            'Email',
            'Id_telegram',
            // 'Password',
            BooleanField::new('Admin'),
        ];
    }
    

    public function configureCrud(Crud $crud): Crud
{
    return $crud
        // // the names of the Doctrine entity properties where the search is made on
        // // (by default it looks for in all properties)
        // ->setSearchFields(['name', 'description'])
        // // use dots (e.g. 'seller.email') to search in Doctrine associations
        // ->setSearchFields(['name', 'description', 'seller.email', 'seller.address.zipCode'])
        // // set it to null to disable and hide the search box
        // ->setSearchFields(null)
        // // call this method to focus the search input automatically when loading the 'index' page
        // ->setAutofocusSearch()
        
        // // defines the initial sorting applied to the list of entities
        // // (user can later change this sorting by clicking on the table columns)
        // ->setDefaultSort(['id' => 'DESC'])
        ->setDefaultSort(['id' => 'ASC', 'email' => 'ASC', 'Nombre' => 'DESC'])
        // // you can sort by Doctrine associations up to two levels
        // ->setDefaultSort(['seller.name' => 'ASC'])

        // the max number of entities to display per page
        ->setPaginatorPageSize(4)
        // the number of pages to display on each side of the current page
        // e.g. if num pages = 35, current page = 7 and you set ->setPaginatorRangeSize(4)
        // the paginator displays: [Previous]  1 ... 3  4  5  6  [7]  8  9  10  11 ... 35  [Next]
        // set this number to 0 to display a simple "< Previous | Next >" pager
        ->setPaginatorRangeSize(30)

        // these are advanced options related to Doctrine Pagination
    //     // (see https://www.doctrine-project.org/projects/doctrine-orm/en/2.7/tutorials/pagination.html)
    //     ->setPaginatorUseOutputWalkers(true)
    //     ->setPaginatorFetchJoinCollection(true)
    ;
}

    
}
