$(document).ready(function()
{
 $('#comment-post-btn').click(function()
 {
 var text=$('#comment-post-text').val();
 var _userId=$('#userId').val();
 var _userName=$('#userName').val();
 if(text.length >0 && _userId!=null)
 {
 	$('.comment-insert-container').css('border','1px solid #e1e1e1');
 	$.post("ajax/comment_insert.php",
 	{
      task:"comment_insert",
      userId:_userId,
      comment:_comment
 	},
 	function(data)
 	{
 		console.log("Response text:" +data);
 	}

 	);
 	console.log(text+ "UserName: " +_userName + "UserId: " +_userId);

 }
 else
 {


 console.log("The text area is empty");
}
 });

});
