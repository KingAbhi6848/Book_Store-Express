function deleteConfirmation(id){
   const result=  confirm("Are you sure you want to delete this Product");
   if(result){
    fetch("/deleteproduct/" +id,{
        method: 'POST'
    }).then(res=>{
        if(res.ok){
            location.reload();
        }
    })
   }
}