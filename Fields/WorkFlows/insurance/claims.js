// Shared claims array
let claims = [
  {id:'C001', policy:'P1001', type:'Health', amount:500, status:'Approved', date:'2025-08-01', submittedBy:'user1'},
  {id:'C002', policy:'P1002', type:'Vehicle', amount:1200, status:'Review', date:'2025-08-02', submittedBy:'user2'},
  {id:'C003', policy:'P1003', type:'Life', amount:8000, status:'Rejected', date:'2025-08-03', submittedBy:'user1'},
  {id:'C004', policy:'P1004', type:'Health', amount:700, status:'Review', date:'2025-08-04', submittedBy:'user2'},
];

// Utility to generate next claim ID
function nextClaimId() {
  return `C${(claims.length+1).toString().padStart(4,'0')}`;
}

// Update claim status
function changeStatus(id, status){
  const claim = claims.find(c => c.id === id);
  if(claim) claim.status = status;
}
