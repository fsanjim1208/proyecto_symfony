<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230131112146 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE participa (id INT AUTO_INCREMENT NOT NULL, evento_id INT NOT NULL, user_id INT NOT NULL, cod_invitacion VARCHAR(10) NOT NULL, presentado TINYINT(1) NOT NULL, INDEX IDX_E926CCD87A5F842 (evento_id), INDEX IDX_E926CCDA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE participa ADD CONSTRAINT FK_E926CCD87A5F842 FOREIGN KEY (evento_id) REFERENCES evento (id)');
        $this->addSql('ALTER TABLE participa ADD CONSTRAINT FK_E926CCDA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE participa DROP FOREIGN KEY FK_E926CCD87A5F842');
        $this->addSql('ALTER TABLE participa DROP FOREIGN KEY FK_E926CCDA76ED395');
        $this->addSql('DROP TABLE participa');
    }
}
