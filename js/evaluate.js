// ======================================================================
// 主程序
$(function() {
  // ----------------------------------------------------------------
  // 设置表单
  setForm();
  // 计算神经网络模型
  var ann_input = getDataFromForm();  //从表单读取数据，并设置URL
  var rs = eval_ann(ann_input);

  // 设置输出结果
  setOutput(rs)

  // ----------------------------------------------------------------
  //当表单变更时计算
  $('#form_agrs').change(function() {
    // 计算神经网络模型
    var ann_input = getDataFromForm();  //从表单读取数据，并设置URL
    var rs = eval_ann(ann_input);
    // 输出结果
    setOutput(rs)
  });
});

// ======================================================================
// 定义函数
function getDataFromForm(){
  // 从表单读取输入数据 ann_input
  form_agrs = $('#form_agrs').serializeArray();
  var ann_input = [];
  for (k in form_agrs){
    // 收集神经网络输入数据
    ann_input.push([parseFloat(form_agrs[k].value)]);
    // 更新URL
    replaceParamVal(form_agrs[k].name, form_agrs[k].value)
  }
  return ann_input;
}

// ----------------------------------------------------------------
// 设置输出
function setOutput(rs) {
  if (rs > 0.5) {
    var rs_text = '阳性';
    $('#rs_progress').addClass('bg-danger');
    $('#rs_text').addClass('text-danger');
  } else {
    var rs_text = '阴性';
    $('#rs_progress').removeClass('bg-danger');
    $('#rs_text').removeClass('text-danger');
  }
  $('#rs_text').html('<b>' + rs_text + '</b>');
  $('#rs_value').html(rs.toString());
  rs_ratio = math.round(rs * 100)
  $('#rs_progress').attr('aria-valuenow', rs_ratio);
  $('#rs_progress').attr('style', 'width: ' + rs_ratio + '%;');
  $('#rs_progress').text(rs_ratio.toString() + '%');
}

// 从URL中获取参数
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}

//根据URL中的参数设置表单
function setForm() {
  $('#arg_age').val(getUrlParam('age')||19);
  $('#arg_alt').val(getUrlParam('alt')||'214.4');
  $('#arg_ast').val(getUrlParam('ast')||'68.7');
  $('#arg_glb').val(getUrlParam('glb')||'26.7');
  $('#arg_alp').val(getUrlParam('alp')||'83.1');
  $('#arg_hbeag').val(getUrlParam('hbeag')||'1665.48');
}


//替换指定传入参数的值,paramName为参数,replaceWith为新值
function replaceParamVal(paramName, replaceWith) {
  var old_URL = window.location.search;
  if (old_URL.length == 0 || old_URL[0] != '?'){
    old_URL='?age=19'
    history.pushState(null,'','?age=19');
  }
  var re = eval('/(' + paramName + '=)([^&]*)/gi');
  if(getUrlParam(paramName)){
    var new_URL = old_URL.replace(re, paramName + '=' + replaceWith);
  }else {
    var new_URL = old_URL+'&'+paramName+'='+replaceWith;
  }
  history.pushState(null,'', new_URL);
}
