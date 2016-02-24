namespace Dal.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addestadoPRC : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Proceso_Competitivo", "ESTADO_PROC", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Proceso_Competitivo", "ESTADO_PROC");
        }
    }
}
