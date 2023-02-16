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

    #[ORM\Column(length: 50)]
    private ?String $incio = null;

    #[ORM\Column(length: 50)]
    private ?String $fin = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIncio(): ?String
    {
        return $this->incio;
    }

    public function setIncio(?String $incio): self
    {
        $this->incio = $incio;

        return $this;
    }

    public function getFin(): ?String
    {
        return $this->fin;
    }

    public function setFin(?String $fin): self
    {
        $this->fin = $fin;

        return $this;
    }
}
