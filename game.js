/* MalphasWats - Ludum Dare 26 */

function Game()
{

    this.setup = function()
    {
    
    }
    
    this.update = function()
    {
    
    }
    
    this.draw = function()
    {
    
    }

}

function Easel()
{

    var painting, painting_context, painting_sprite
    var easel
    var sidebar, sidebar_context, sidebar_sprite
    
    var target_coverage
    
    this.setup = function()
    {
        jaws.context.mozImageSmoothingEnabled = false;
        easel = new jaws.Sprite({image:"graphics/easel.png", x:150, y:20, scale_image:5})
    
        painting = document.createElement('canvas')
        painting.width = 510
        painting.height = 325
        painting_context = painting.getContext('2d')
        
        painting_sprite = new jaws.Sprite({image: painting, x:195, y:65})
        
        painting_context.get_coverage = function()
        {
            var painting_data = painting_context.getImageData(0, 0, painting_sprite.width, painting_sprite.height).data
            var coloured_pixels = 0
            
            for(var i=0 ; i < painting_data.length / 4 ; i++)
            {
                if (painting_data[(i*4)] > 0) //only checks red!
                {
                    coloured_pixels += 1
                }
            }
            
            return Math.round(coloured_pixels / (painting_data.length /4) *100)
        }
        
        sidebar = document.createElement('canvas')
        sidebar.width = 120
        sidebar.height = 325
        sidebar_context = sidebar.getContext('2d')
        
        sidebar_context.fillStyle = "#dddddd"
        sidebar_context.fillRect(0,0, sidebar.width, sidebar.height)
        
        sidebar_context.textAlign  = "Left"
        sidebar_context.fillStyle  = "black"
        sidebar_context.font       = "bold 20px Terminal"
        
        sidebar_context.fillText("Target",15, 115)
        sidebar_context.fillText("Coverage",15, 195)
        
        var bryan = new jaws.Sprite({image: "graphics/bryan.png", x:5, y:5, scale_image:4})
        
        sidebar_context.drawImage(bryan.image, 30, 15, 64, 64)
        
        sidebar_sprite = new jaws.Sprite({image: sidebar, x:20, y:20})
        
        jaws.clear()
        easel.draw()
        
        target_coverage = 17
    }
    
    this.update = function()
    {
        if (jaws.pressed("left_mouse_button"))
        {
            painting_context.save()
            painting_context.translate(-painting_sprite.x, -painting_sprite.y)
            painting_context.beginPath()
            painting_context.fillStyle = "red"
            painting_context.arc(jaws.mouse_x, jaws.mouse_y, 4, 0, 2 * Math.PI, false)
            painting_context.fill()
            painting_context.restore()
        }
        else
        {
            var coverage = painting_context.get_coverage()
            
            sidebar_context.save()
            sidebar_context.fillStyle = "white"
            sidebar_context.fillRect(10, 120, 100, 50)
            
            sidebar_context.fillRect(10, 200, 100, 50)
            
            sidebar_context.textAlign  = "center"
            sidebar_context.fillStyle  = "black"
            sidebar_context.font       = "bold 40px Terminal"
            
            sidebar_context.fillText(target_coverage+'%',60, 160)
            sidebar_context.fillText(coverage+'%',60, 240)
            
            sidebar_context.restore()
            
            //check to see if won
        }
        
        
    }
    
    this.draw = function()
    {
        painting_sprite.draw()
        sidebar_sprite.draw()
    }
    
}



function IntroMenu()
{
    this.setup = function()
    {
    
    }
    
    this.update = function()
    {
    
    }

    this.draw = function()
    {
        jaws.clear()

        jaws.context.save()
        jaws.context.textAlign  = "left"
        jaws.context.fillStyle  = "black"
        jaws.context.font       = "bold 20px terminal";
        jaws.context.fillText("The Minimalist", 120, 100);
        jaws.context.restore()

    }
}