module.exports=function(req,res,next){
  if(req.user.role !== 'admin') return res.status(403).send('Forbidden');
  next();

}

// santha=>user=>token=>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmFjZDkzOWVhYjZjNTk5MzA4MTM3NDAiLCJlbWFpbCI6InNAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NTU0OTUwMDN9.RH1AwkAH6M5KGOjUk3aL8In69bl60oLLZopkT6HyRvg

//Sajib=>admin=>token=>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmFjZDhmOWVhYjZjNTk5MzA4MTM3M2MiLCJlbWFpbCI6InNhamlic2Fya2VyMDExMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NTU0OTU2MjV9.sQvQxK8fjkCIXI2VFzrPqCRIFJPwwuTNl-awssqIkb8