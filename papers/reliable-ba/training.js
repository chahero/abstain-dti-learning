(() => {
  'use strict';
  const $=selector=>document.querySelector(selector);
  const $$=selector=>[...document.querySelectorAll(selector)];
  const data=window.REVIEW_DATA;
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const roleText={
    id:'식별자는 행 추적과 학습·검증·시험 분할에 씁니다. ID 문자열을 친화도 예측 신경망의 특징으로 넣지 않습니다.',
    features:'704개 특징은 신뢰성 망으로 갑니다. 여기서 대상의 특징에 따른 엔진별 r 4개를 계산합니다.',
    scores:'4개 원래 점수는 각각 자기 전문가 변환망으로 갑니다. 여기서 목표 친화도의 평균과 불확실성 매개변수를 계산합니다.',
    target:'실험 정답 y는 예측을 만든 뒤 손실에서 비교합니다. 정답을 예측 입력에 넣지 않으며, 추론 경로에서는 y 없이 계산합니다.'
  };
  $$('[data-row-role]').forEach(button=>button.addEventListener('click',()=>{
    const role=button.dataset.rowRole;
    $$('[data-row-role]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    $$('[data-training-role]').forEach(row=>row.classList.toggle('row-highlight',row.dataset.trainingRole===role));
    $('#row-role-reading').textContent=roleText[role];
  }));

  const names=['GNINA','BIND','FlowDock','DynamicBind','Deep Ensemble','RELIABLE-BA'];
  function report(){
    const key=$('#dataset').value;
    const rows=data.tables[key].filter(row=>row.length===8&&row[0]!=='Method');
    const cols=[1,2,5];
    const best=Object.fromEntries(cols.map(col=>[col,Math.min(...rows.filter(row=>row[col]!=='-').map(row=>parseFloat(row[col])))]));
    const dataset=key==='table1'?'PDBbind · Table 1':'BDB2020+ · Table 2';
    $('#report-summary-table').innerHTML=`<table class="report-table"><caption>${dataset} · 원문에서 선택한 6개 방법 · 색은 전체 비교 방법 중 가장 낮은 보고 평균</caption><thead><tr><th>방법</th><th>MAE ↓</th><th>RMSE ↓</th><th>ECE ↓</th></tr></thead><tbody>${names.map(name=>{
      const row=rows.find(r=>r[0]===name);
      return `<tr class="${name==='RELIABLE-BA'?'report-ours':'report-baseline'}"><th scope="row">${name}</th>${cols.map(col=>{
        const parts=row[col].split(' ± ');
        return `<td${parseFloat(row[col])===best[col]?' class="best-value"':''}>${escape(parts[0])}${parts[1]?`<small>± ${escape(parts[1])}</small>`:''}</td>`;
      }).join('')}</tr>`;
    }).join('')}</tbody></table>`;
    $('#report-summary-reading').textContent=data.reportNotes[key];
  }
  $('#dataset').addEventListener('change',report);report();

  $$('[data-coverage]').forEach(button=>button.addEventListener('click',()=>{
    const selected=button.dataset.coverage==='selected';
    $$('[data-coverage]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    $$('#coverage-grid span').forEach((cell,i)=>cell.classList.toggle('kept',!selected||i<10));
    $('#coverage-grid').setAttribute('aria-label',selected?'100칸 중 10칸 유지, 90칸 제외하는 개념도':'100칸 모두 유지하는 비교 기준 개념도');
    $('#coverage-status').textContent=selected?'100칸 중 10칸 유지 · 90칸 제외':'100칸 모두 유지 · 제외 없음';
    $('#coverage-math').innerHTML=selected?'<strong>90% 제외</strong><span>→</span><strong>10% 유지</strong>':'<strong>0% 제외</strong><span>→</span><strong>100% 유지</strong>';
    $('#coverage-reading').innerHTML=selected?'불확실성이 낮은 예측 10%만 남겼을 때, 남은 집합의 MAE가 전체 예측을 사용할 때보다 <strong>상대적으로 25.7% 감소</strong>했다고 보고합니다.':'전체 예측을 사용하는 경우가 상대 개선율의 비교 기준입니다. <strong>10%만 남긴 경우의 25.7% 개선을 전체 데이터의 개선으로 읽으면 안 됩니다.</strong>';
  }));
})();
