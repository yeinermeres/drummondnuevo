namespace Dal.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class aspirantes : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Aspirante_Proceso",
                c => new
                    {
                        ID_ASPIRANTEPROCESO = c.Int(nullable: false, identity: true),
                        ID_ASPIRANTE = c.Int(nullable: false),
                        ID_PROCESO = c.Int(nullable: false),
                        RUTA = c.String(),
                    })
                .PrimaryKey(t => t.ID_ASPIRANTEPROCESO)
                .ForeignKey("dbo.Proceso_Competitivo", t => t.ID_PROCESO, cascadeDelete: true)
                .ForeignKey("dbo.Aspirantes", t => t.ID_ASPIRANTE, cascadeDelete: true)
                .Index(t => t.ID_ASPIRANTE)
                .Index(t => t.ID_PROCESO);
            
        }
        
        public override void Down()
        {
       
            DropForeignKey("dbo.Aspirante_Proceso", "ID_ASPIRANTE", "dbo.Aspirantes");
            DropForeignKey("dbo.Aspirante_Proceso", "ID_PROCESO", "dbo.Proceso_Competitivo");
            DropIndex("dbo.Polizas", new[] { "oferta_mercantil_ID_OFERTA" });
            DropIndex("dbo.Aspirante_Proceso", new[] { "ID_PROCESO" });
            DropIndex("dbo.Aspirante_Proceso", new[] { "ID_ASPIRANTE" });
            DropTable("dbo.Aspirantes");
            DropTable("dbo.Aspirante_Proceso");
        }
    }
}
