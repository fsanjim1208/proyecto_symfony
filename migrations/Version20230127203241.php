<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230127203241 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE evento DROP FOREIGN KEY FK_47860B0591BDCCB');
        $this->addSql('DROP INDEX IDX_47860B0591BDCCB ON evento');
        $this->addSql('ALTER TABLE evento DROP presentacion_id');
        $this->addSql('ALTER TABLE juego DROP FOREIGN KEY FK_F0EC403D91BDCCB');
        $this->addSql('DROP INDEX IDX_F0EC403D91BDCCB ON juego');
        $this->addSql('ALTER TABLE juego DROP presentacion_id');
        $this->addSql('ALTER TABLE presentacion ADD evento_id INT NOT NULL, ADD juego_id INT NOT NULL');
        $this->addSql('ALTER TABLE presentacion ADD CONSTRAINT FK_56A887B587A5F842 FOREIGN KEY (evento_id) REFERENCES evento (id)');
        $this->addSql('ALTER TABLE presentacion ADD CONSTRAINT FK_56A887B513375255 FOREIGN KEY (juego_id) REFERENCES juego (id)');
        $this->addSql('CREATE INDEX IDX_56A887B587A5F842 ON presentacion (evento_id)');
        $this->addSql('CREATE INDEX IDX_56A887B513375255 ON presentacion (juego_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE evento ADD presentacion_id INT NOT NULL');
        $this->addSql('ALTER TABLE evento ADD CONSTRAINT FK_47860B0591BDCCB FOREIGN KEY (presentacion_id) REFERENCES presentacion (id)');
        $this->addSql('CREATE INDEX IDX_47860B0591BDCCB ON evento (presentacion_id)');
        $this->addSql('ALTER TABLE juego ADD presentacion_id INT NOT NULL');
        $this->addSql('ALTER TABLE juego ADD CONSTRAINT FK_F0EC403D91BDCCB FOREIGN KEY (presentacion_id) REFERENCES presentacion (id)');
        $this->addSql('CREATE INDEX IDX_F0EC403D91BDCCB ON juego (presentacion_id)');
        $this->addSql('ALTER TABLE presentacion DROP FOREIGN KEY FK_56A887B587A5F842');
        $this->addSql('ALTER TABLE presentacion DROP FOREIGN KEY FK_56A887B513375255');
        $this->addSql('DROP INDEX IDX_56A887B587A5F842 ON presentacion');
        $this->addSql('DROP INDEX IDX_56A887B513375255 ON presentacion');
        $this->addSql('ALTER TABLE presentacion DROP evento_id, DROP juego_id');
    }
}
