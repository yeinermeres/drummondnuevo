namespace Dal.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FROFMPROC : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Oferta_Mercantil", "PROC_OFM", c => c.Int(nullable: false));
            CreateIndex("dbo.Oferta_Mercantil", "PROC_OFM");
            AddForeignKey("dbo.Oferta_Mercantil", "PROC_OFM", "dbo.Proceso_Competitivo", "ID_COMPETITIVO", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Oferta_Mercantil", "PROC_OFM", "dbo.Proceso_Competitivo");
            DropIndex("dbo.Oferta_Mercantil", new[] { "PROC_OFM" });
            DropColumn("dbo.Oferta_Mercantil", "PROC_OFM");
        }
    }
}
