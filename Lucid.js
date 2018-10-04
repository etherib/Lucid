function Lucid() {
  Lu_Player(); //conntrols the movement of the player 
  lu.collide(dahWallz); //adds collison to make sure the player does not fly though the walls 

}
 
function Lu_Player() {
 

  if (keyDown(LEFT_ARROW)) {
    lu.setVelocity(-2, 0);
    lu.changeAnimation("walking"); 
    lu.rotation = 180;
  } 
  else if (keyDown(RIGHT_ARROW)) {
    lu.setVelocity(2, 0);
    lu.changeAnimation("walking"); 
    lu.rotation = 0;
  } 
  else if (keyDown(UP_ARROW)) {
    lu.setVelocity(0, -2);
    lu.changeAnimation("walking");
    lu.rotation = 270;
  } 
  else if (keyDown(DOWN_ARROW)) {
    lu.setVelocity(0, 2);
    lu.changeAnimation("walking");
    lu.rotation = 90;
  } 
  else {
    lu.changeAnimation("standing");
    lu.setVelocity(0, 0);
  }


}