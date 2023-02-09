<?php

namespace App\Entity;

use App\Repository\ParticipaRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ParticipaRepository::class)]
class Participa
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 10)]
    private ?string $cod_invitacion = null;

    #[ORM\Column]
    private ?bool $presentado = null;

    #[ORM\ManyToOne(inversedBy: 'participa')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Evento $evento = null;

    #[ORM\ManyToOne(inversedBy: 'participa')]
    #[ORM\JoinColumn(nullable: false)]
    private ?user $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCodInvitacion(): ?string
    {
        return $this->cod_invitacion;
    }

    public function setCodInvitacion(string $cod_invitacion): self
    {
        $this->cod_invitacion = $cod_invitacion;

        return $this;
    }

    public function isPresentado(): ?bool
    {
        return $this->presentado;
    }

    public function setPresentado(bool $presentado): self
    {
        $this->presentado = $presentado;

        return $this;
    }

    public function getEvento(): ?Evento
    {
        return $this->evento;
    }

    public function setEvento(?Evento $evento): self
    {
        $this->evento = $evento;

        return $this;
    }

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): self
    {
        $this->user = $user;

        return $this;
    }
}
