<?php

namespace App\Entity;

use App\Repository\TramoRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TramoRepository::class)]
class Tramo
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $incio = null;

    #[ORM\Column(type: Types::TIME_MUTABLE)]
    private ?\DateTimeInterface $fin = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIncio(): ?\DateTimeInterface
    {
        return $this->incio;
    }

    public function setIncio(\DateTimeInterface $incio): self
    {
        $this->incio = $incio;

        return $this;
    }

    public function getFin(): ?\DateTimeInterface
    {
        return $this->fin;
    }

    public function setFin(\DateTimeInterface $fin): self
    {
        $this->fin = $fin;

        return $this;
    }
}
