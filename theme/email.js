function sendContact() {
	var postdata= "sendemail=1&toemail=rogerdumbar@gmail.com";
		postdata+="&from="+document.getElementById("from").value;
		postdata+="&subject=softoutfit.com contact";
		postdata+="&sendmethod=mail";
		postdata+="&message="+encodeURIComponent(document.getElementById("message").value).replace("%20", "+");
	var url="/mail_test.php";
	var request=new XMLHttpRequest();
	request.open("POST",url,true);
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	request.overrideMimeType("text/plain");
	request.onreadystatechange=function() { 
		if ( request.readyState===4 ) {			
			if ( request.responseText !== "OK" || request.responseText == "FAIL" ) {
				alert( "Sorry, your mail did not send" );
			}
			document.getElementById("from").value = "";
			document.getElementById("message").value = "";
		}
	}
	request.send(postdata);
}