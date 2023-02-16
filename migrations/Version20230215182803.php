<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230215182803 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE juego CHANGE img img VARCHAR(150) NOT NULL');
        $this->addSql('ALTER TABLE reserva DROP tramo_inicio');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE juego CHANGE img img VARCHAR(150) DEFAULT NULL');
        $this->addSql('ALTER TABLE reserva ADD tramo_inicio DATE NOT NULL');
    }
}
