<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;  
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nombre',TextType::class,[
                'label' => false,
                'constraints' => [
                    new Length([
                        'min' => 3,
                        'minMessage' => 'El nombre debe tener al menos {{ limit }} caracteres',
                        // max length allowed by Symfony for security reasons
                        'max' => 250,
                    ]),
                    new NotBlank([
                        'message' => 'Por favor el nombre no puede estar vacio',
                    ]),
                ],
                ])
            ->add('apellido1',TextType::class,[
                'label' => false,
                'constraints' => [
                    new Length([
                        'min' => 4,
                        'minMessage' => 'El primer apellido debe tener al menos {{ limit }} caracteres',
                        // max length allowed by Symfony for security reasons
                        'max' => 250,
                    ]),
                    new NotBlank([
                        'message' => 'Por favor introduzca el primer apellido',
                    ]),
                ],
                ])
            ->add('apellido2',TextType::class,[
                'label' => false,
                'constraints' => [
                    new NotBlank([
                        'message' => 'Por favor introduzca el segundo apellido',
                    ]),
                ],
                ])
            // ->add('usuario')
            ->add('id_telegram',NumberType::class,[
                'label' => false,
                'constraints' => [
                    new NotBlank([
                        'message' => 'Por favor introduzca su numero de telegram',
                    ]),
                ],
                ])
            
            ->add('email',EmailType::class,[
                'label' => false,
                'constraints' => [
                    new NotBlank([
                        'message' => 'Por favor introduzca un email valido',
                    ]),
                ],
                ])
            ->add('plainPassword', PasswordType::class, [
                // instead of being set onto the object directly,
                // this is read and encoded in the controller
                'mapped' => false,
                'attr' => ['autocomplete' => 'new-password'],
                'constraints' => [
                    new Length([
                        'min' => 5,
                        'minMessage' => 'La contraseña debe tener al menos {{ limit }} caracteres',
                        // max length allowed by Symfony for security reasons
                        'max' => 4096,
                    ]),
                    new NotBlank([
                        'message' => 'Por favor introduzca un una contraseña',
                    ]),
                ],
                'label' => false
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
            'constraints' => [
                new UniqueEntity([
                    'fields' => ['email'],
                    'message' => 'Este correo electrónico ya está en uso.'
                ])
            ],
        ]);
    }
}
