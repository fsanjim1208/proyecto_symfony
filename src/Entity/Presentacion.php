<?php

namespace App\Entity;

use App\Repository\PresentacionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PresentacionRepository::class)]
class Presentacion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'presentacion')]
    #[ORM\JoinColumn(nullable: false)]
    private ?evento $evento = null;

    #[ORM\ManyToOne(inversedBy: 'presentacion')]
    #[ORM\JoinColumn(nullable: false)]
    private ?juego $juego = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEvento(): ?evento
    {
        return $this->evento;
    }

    public function setEvento(?evento $evento): self
    {
        $this->evento = $evento;

        return $this;
    }

    public function getJuego(): ?juego
    {
        return $this->juego;
    }

    public function setJuego(?juego $juego): self
    {
        $this->juego = $juego;

        return $this;
    }
}
