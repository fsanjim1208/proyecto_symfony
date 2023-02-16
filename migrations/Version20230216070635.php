<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230216070635 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reserva CHANGE fecha_anulacion fecha_anulacion VARCHAR(50) NOT NULL, CHANGE presentado presentado TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE tramo CHANGE incio incio VARCHAR(50) NOT NULL, CHANGE fin fin VARCHAR(50) NOT NULL');
        
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE reserva CHANGE fecha_anulacion fecha_anulacion VARCHAR(50) DEFAULT NULL, CHANGE presentado presentado TINYINT(1) DEFAULT NULL');
        $this->addSql('ALTER TABLE tramo CHANGE incio incio TIME NOT NULL, CHANGE fin fin TIME NOT NULL');

    }
}
