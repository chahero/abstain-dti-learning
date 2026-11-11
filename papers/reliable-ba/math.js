/* RELIABLE-BA v1 equations (8)-(17). An educational calculation, not model inference. */
(function (root) {
  'use strict';
  function fuse(experts) {
    if (!experts.length) throw new Error('At least one expert is required');
    const scaled = experts.map(e => {
      if (![e.mean,e.nu,e.alpha,e.beta,e.r].every(Number.isFinite) || e.nu<=0 || e.alpha<=1 || e.beta<=0 || e.r<=0 || e.r>1) throw new Error('Invalid NIG parameters');
      return {mean:e.mean,nu:e.r*e.nu,alpha:1+e.r*(e.alpha-1),beta:e.r*e.beta};
    });
    const nu = scaled.reduce((s,e) => s+e.nu,0);
    const mean = scaled.reduce((s,e) => s+e.nu*e.mean,0)/nu;
    const alpha = scaled.reduce((s,e) => s+e.alpha,0)+(scaled.length-1)/2;
    const disagreement = scaled.reduce((s,e) => s+.5*e.nu*(e.mean-mean)**2,0);
    const beta = scaled.reduce((s,e) => s+e.beta,0)+disagreement;
    return {mean,nu,alpha,beta,disagreement,aleatoric:beta/(alpha-1),epistemic:beta/(nu*(alpha-1)),weights:scaled.map(e=>e.nu/nu),scaled};
  }
  const api={fuse};
  if(typeof module!=='undefined'&&module.exports) module.exports=api;
  else root.ReviewMath=api;
})(typeof globalThis!=='undefined'?globalThis:this);
