<?php

namespace App\Entity;

use App\Repository\FestivoRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FestivoRepository::class)]
class Festivo
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $Day = null;

    #[ORM\Column]
    private ?int $Month = null;

    #[ORM\Column]
    private ?int $year = null;

    #[ORM\Column(length: 100)]
    private ?string $descripcion = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDay(): ?int
    {
        return $this->Day;
    }

    public function setDay(int $Day): self
    {
        $this->Day = $Day;

        return $this;
    }

    public function getMonth(): ?int
    {
        return $this->Month;
    }

    public function setMonth(int $Month): self
    {
        $this->Month = $Month;

        return $this;
    }

    public function getYear(): ?int
    {
        return $this->year;
    }

    public function setYear(int $year): self
    {
        $this->year = $year;

        return $this;
    }

    public function getDescripcion(): ?string
    {
        return $this->descripcion;
    }

    public function setDescripcion(string $descripcion): self
    {
        $this->descripcion = $descripcion;

        return $this;
    }
}
