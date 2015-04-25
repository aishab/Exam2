function MenuChoice(){
    if (document.getElementById("menu").value =="Category List")
    {
        document.getElementById("sec1").style.visibility = "visible";
        document.getElementById("sec2").style.visibility = "hidden";
        document.getElementById("sec3").style.visibility = "hidden";
        document.getElementById("sec4").style.visibility = "hidden";
        document.getElementById("sec5").style.visibility = "hidden";
    }
   else if (document.getElementById("menu").value =="Product Category")
   {
    document.getElementById("sec2").style.visibility = "visible";
    document.getElementById("sec1").style.visibility = "hidden";
    document.getElementById("sec3").style.visibility = "hidden";
    document.getElementById("sec4").style.visibility = "hidden";
    document.getElementById("sec5").style.visibility = "hidden";
   }
   
    else if (document.getElementById("menu").value =="Change Description")
    {
    document.getElementById("sec3").style.visibility = "visible";
    document.getElementById("sec1").style.visibility = "hidden";
    document.getElementById("sec2").style.visibility = "hidden";
    document.getElementById("sec4").style.visibility = "hidden";
    document.getElementById("sec5").style.visibility = "hidden";
   }

   else if (document.getElementById("menu").value =="Delete Category")
    {
    document.getElementById("sec4").style.visibility = "visible";
    document.getElementById("sec1").style.visibility = "hidden";
    document.getElementById("sec2").style.visibility = "hidden";
    document.getElementById("sec3").style.visibility = "hidden";
    document.getElementById("sec5").style.visibility = "hidden";
   }
   
   else if (document.getElementById("menu").value =="About")
    {
    document.getElementById("sec5").style.visibility = "visible";
    document.getElementById("sec1").style.visibility = "hidden";
    document.getElementById("sec2").style.visibility = "hidden";
    document.getElementById("sec3").style.visibility = "hidden";
    document.getElementById("sec4").style.visibility = "hidden";
   }
   
   else
   {
    document.getElementById("sec1").style.visibility = "hidden";
    document.getElementById("sec2").style.visibility = "hidden";
    document.getElementById("sec3").style.visibility = "hidden";
    document.getElementById("sec4").style.visibility = "hidden";
    document.getElementById("sec5").style.visibility = "hidden";
   }
}

//Section 1 start
function catrgyList() {     
    var objRequest = new XMLHttpRequest();  //Create AJAX request object
    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";
   // url += document.getElementById("custid").value;
    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
        {
            var output = JSON.parse(objRequest.responseText);
            GenerateOutput(output);
        }
    }
    //Initiate the server request
    
    objRequest.open("GET", url, true);
    objRequest.send();
    }
    function GenerateOutput(result)
    {
        var count = 0;
        var displaytext = "<table><tr><th>Category ID &nbsp;&nbsp;</th><th>" +
        "Category Name &nbsp;&nbsp;&nbsp;</th><th>Category Description</th></tr>";
        
        //Loop to extract data from the response object
        for (count = 0; count < result.GetAllCategoriesResult.length; count++)
        {
            displaytext += "<tr><td>" + result.GetAllCategoriesResult[count].CID + "</td><td>" + result.GetAllCategoriesResult[count].CName + "</td><td>"+ result.GetAllCategoriesResult[count].CDescription + "</td></tr>";
           
        }
             document.getElementById("orderdisplay").innerHTML = displaytext;
    }  //Section 1 ENDS Here
 
 //section 2 starts  
function CreateCategory()
{

var oRequest = new XMLHttpRequest();
var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";


//Collect Customer data from web page

var categoryName = document.getElementById("custid").value;
var categoryDesc = document.getElementById("custname").value;
var newcustomer = '{"CName":"' + categoryName + '","CDescription":"' + categoryDesc +'"}';
oRequest.onreadystatechange = function()
{
    if (oRequest.readyState == 4 && oRequest.status == 200)
    {
        var result = JSON.parse(oRequest.responseText);
    
        OResult(result);
    }
}
oRequest.open("POST", url, true);
oRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); oRequest.send(newcustomer);
}

    function OResult(result)
    {
       if (result.WasSuccessful == 1)
        {
          document.getElementById("rslt").innerHTML = "The operation was successful!"
        }
        else

        {
          document.getElementById("rslt").innerHTML = "Operation failed Ð Error Message included" + "<br>" + result.Exception;
        }
    }  //section 2 ends
        
        
    //Section 3 starts
    
function UpdateCategoryDesc()
{

    var objectRequest = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
    
    
    //Collect Customer data from web page
    
    var categId = Number(document.getElementById("catID").value);
    var categDesc = document.getElementById("catDesc").value;
    var newcategory = '{"CID":' + categId + ',"CDescription":"' + categDesc +'"}';
    objectRequest.onreadystatechange = function()
    {
        if (objectRequest.readyState == 4 && objectRequest.status == 200)
        {
            var result = JSON.parse(objectRequest.responseText);
        
            ObjResult(result);
        }
    }
    objectRequest.open("POST", url, true);
    objectRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); objectRequest.send(newcategory);
    }
    
    function ObjResult(endresult)
    {
          if (endresult.WasSuccessful == 1)
        {
          document.getElementById("result").innerHTML = "The operation was successful!"
        }
        else if(endresult.WasSuccessful == 0)
        {
          document.getElementById("result").innerHTML = "Operation failed with an unspecified error!"
        }
        else if (endresult.WasSuccessful == -2)
        {
            document.getElementById("result").innerHTML = "Operation failed because the data string supplied could not be deserialized into the service object"
        }
        else
        {
            document.getElementById("result").innerHTML = "Operation failed because a record with the supplied Order ID could not be found"
        }
       
    } //section 3 ends
    
    //Section 4 Starts
    function Delete()
    {
        var Request = new XMLHttpRequest();
        var url ="http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
         url += document.getElementById("categoryID").value;
        
        Request.onreadystatechange = function()
    {
        if (Request.readyState == 4 && Request.status == 200)
        {
            var output = JSON.parse(Request.responseText);
            Result(output);
        }
    }
    
    //Initiate the server request    
    Request.open("GET", url, true);
    Request.send();
    }
    function Result(output) {
     if (output.DeleteCategoryResult.WasSuccessful==1)
     {
        document.getElementById("display").innerHTML ="Operation completed successfully"
     }
     else{
        document.getElementById("display").innerHTML = "Operation failed Ð Error Message included" + "<br>" + output.Exception;
     }
}