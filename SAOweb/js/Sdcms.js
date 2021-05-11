var Ajax_msg="获取失败";
//代码运行	
function runcode(codeBtn)
{
	var codeText=codeBtn.parentNode.firstChild;
	var codeValue=codeText.value;
	var rng=window.open('','','');
		rng.opener=null;
		rng.document.write(codeValue);
		rng.document.close();
}

//复制代码
function copycode(codeBtn)
{
	var codeText=codeBtn.parentNode.firstChild;
	var rng=codeText.createTextRange();
		rng.moveToElementText(codeText);
		rng.scrollIntoView();
		rng.select();
		rng.execCommand("Copy");
		rng.collapse(false);
}

//保存代码
function savecode(codeBtn)
{	
	var winname=window.open('about:blank', '_blank', 'top=100');
		winname.document.open();
		winname.document.write(codeBtn.parentNode.firstChild.value);
		winname.document.execCommand('saveas','','runcode.htm');
		winname.close();		
}

//JS版的Server.UrlEncode编码函数
function urlEncode(str) 
{ 
    str = str.replace(/./g,function(sHex) 
    { 
        window.EnCodeStr = ""; 
        window.sHex = sHex; 
        window.execScript('window.EnCodeStr=Hex(Asc(window.sHex))',"vbscript"); 
        return window.EnCodeStr.replace(/../g,"%$&"); 
    }); 
    return str; 
} 

function trim(s){return  s.replace(/(^\s*)|(\s*$)/g,  "");} 

function setTab(name,cursel,n){
	for(i=1;i<=n;i++){
		var menu=$('#'+name+i);
		var con=$("#con_"+name+"_"+i);
		menu[0].className=i==cursel?"hover":"";
		con[0].style.display=i==cursel?"block":"none";
	}
}

function addNum(t0){o=$('#'+t0);o.parent().css('position','relative').append($('<span>+1</span>').css({'position':'absolute','left':'0px','top':'-15px','color':'#f00'}).animate({fontSize:80,opacity:0},800,function(){$(this).remove();}))}

function Get_Spider()
{
	$.ajax({
	type: "get",
	cache:false,
	url: webdir+"inc/Spider.asp",
	timeout: 20000,
	error: function(){},
	success: function(){}
	});
}

function get_hits(t0,t1,t2,t3)
{
	$('#'+t3).html("<img src="+webdir+"skins/2011/images/loading.gif>");
	$.ajax({
	type: "get",
	cache:false,
	url: webdir+"inc/gethits.asp?id="+t0+"&action="+t1+"&t="+t2+"",
	timeout: 20000,
	error: function(){$('#'+t3).html(Ajax_msg);},
	success: function(t0){$('#'+t3).html(t0);}
	});
}

function Get_Digg(t0,t1)
{
	$('#'+t1).html("<img src="+webdir+"skins/2011/images/loading.gif>");
	$.ajax({
	type: "get",
	cache:false,
	url: webdir+"inc/Digg.asp?id="+t0+"",
	timeout: 20000,
	error: function(){$('#'+t1).html(Ajax_msg);},
	success: function(t0){$('#'+t1).html(t0);}
	});
}

function Digg(t0,t1,t2)
{
	$('#'+t2).html("<img src="+webdir+"skins/2011/images/loading.gif>");
	$.ajax({
	type: "get",
	cache:false,
	url: webdir+"inc/Digg.asp?id="+t0+"&action=Digg",
	timeout: 20000,
	error: function(){$('#'+t2).html(Ajax_msg);},
	success: function(t3){$('#'+t2).html(t3.substring(1));if(t3.substring(0,1)==0){Get_Digg(t0,t1)}}
	});
}

function Send_Digg(t0,t1)
{
	$.ajax({
	type: "get",
	cache:false,
	url: webdir+"Plug/Digg.asp?id="+t0+"&act="+t1+"&action=up",
	timeout: 20000,
	error: function(){alert(Ajax_msg);},
	success: function(t00){
		var t2=t00.split(':');
		if(t2[8]==0)
		{alert("你不是已经表过态了嘛!")}
		else{
			addNum("digg_num_"+(t1+1))
			Load_Gigg(t0);
			}
		}
	});
}

function Load_Gigg(t0)
{
	$.ajax(
		{
			type: "get",
			cache:false,
			url: webdir+"Plug/Digg.asp?id="+t0,
			timeout: 20000,
			error: function(){alert(Ajax_msg);},
			success: function(t1)
			{
				var t2=t1.split(':');
				for(i=0;i<8;i++)
				{
					var t3=t2[i].split('#');
					$("#digg_"+(i+1)).html(t3[0]);
					$("#digg_num_"+(i+1))[0].style.height=t3[1]*0.5+'px';
				}	
			}
		}
	);
}

function get_comment(t0,t1)
{
	$('#'+t1).html("<img src="+webdir+"skins/2011/images/loading.gif>");
	$.ajax({
	type: "get",
	cache:false,
	url: webdir+"inc/gethits.asp?id="+t0+"&action=2",
	timeout: 20000,
	error: function(){$('#'+t1).html(Ajax_msg)},
	success: function(t0){$('#'+t1).html(t0);}
	})
}


function checksearch(theform)
{
	if (trim(theform.key.value)=='')
	{alert('关键字不能为空');
	theform.key.focus();
	theform.key.value='';
	return false
	}
	if (theform.key.value=='请输入关键字')
	{alert('关键字不能为空');
	theform.key.focus();
	theform.key.value='';
	return false
	}
	if(navigator.userAgent.indexOf("MSIE")>0)
	{
		window.location.href=webdir+"search/?/"+urlEncode(trim(theform.key.value))+"/";
	}
	else
	{
		window.location.href=webdir+"search/?/"+trim(theform.key.value)+"/";
	}
	return false
}

function set_comment(followid,title)
{
	$("#followid")[0].value=followid;
	$("#get_html")[0].style.display="block";
	$("#get_html").html("<b>引用：</b>"+title+"　<a href='javascript:void(0)' onclick='del_comment()' title='清除引用'>×</a>");
	$("#coment_content")[0].focus();
}

function del_comment()
{
	$("#followid")[0].value="";
	$("#get_html")[0].style.display="none";
	$("#get_html").html("");
}

function checkcomment(theform)
{
	if (trim(theform.content.value)=='')
	{   
		alert('内容不能为空');
		theform.content.focus();
		theform.content.value='';
		return false
	}
	if (trim(theform.username.value)=='')
	{
		alert('姓名不能为空');
		theform.username.focus();
		theform.username.value='';
		return false
	}
	if (trim(theform.yzm.value)=='')
	{   
		alert('验证码不能为空');
		theform.yzm.focus();
		theform.yzm.value='';
		return false
	}
	var param;
	param=webdir+"plug/comment/index.asp?action=save";
	param+="&username="+escape(trim(theform.username.value));
	param+="&content="+escape(trim(theform.content.value));
	param+="&yzm="+escape(trim(theform.yzm.value));
	param+="&id="+escape(trim(theform.id.value));
	param+="&followid="+escape(trim(theform.followid.value));
	$('#showmsg').html("<img src="+webdir+"skins/2011/images/loading.gif>");
	$.ajax({
	type:"get",
	cache:false,
	url:param,
	timeout:20000,
	error:function(){$('#showmsg').html(Ajax_msg);},
	success:function(t0)
	{
		$('#showmsg').html(t0.substring(1));
		if(t0.substring(0,1)==0){theform.username.value='';theform.yzm.value='';theform.content.value='';$("#yzm_num")[0].src = $("#yzm_num")[0].src+"&"+Math.random();location.href=webdir+"plug/comment/?id="+theform.id.value}
		}
	});
	return false
}

function Comment_Support(ID)
{
	param=webdir+"plug/comment/?action=support";
	param+="&ID="+escape(ID);
	$.ajax({
	type:"get",
	cache:false,
	url:param,
	timeout:20000,
	error:function(){$('#support_'+ID).html(Ajax_msg);},
	success:function(t0)
	{
		if(t0.substring(0,1)==0){
			$('#support_'+ID).html("已支持("+t0.substring(1)+")")
		}
		else
		{
			alert("您提交的速度太快！")
			}
		}
	});
	return false
}
 
function checkbook(theform)
{  
	if (trim(theform.content.value)=='')
	{   alert('内容不能为空');
		theform.content.focus();
		theform.content.value='';
		return false
	}
	if (trim(theform.username.value)=='')
	{   alert('姓名不能为空');
		theform.username.focus();
		theform.username.value='';
		return false
	}
	if (trim(theform.yzm.value)=='')
	{   alert('验证码不能为空');
		theform.yzm.focus();
		theform.yzm.value='';
		return false
	}
	var param;
	param=webdir+"plug/book/index.asp?action=save";
	param+="&username="+escape(trim(theform.username.value));
	param+="&content="+escape(trim(theform.content.value));
	param+="&yzm="+escape(trim(theform.yzm.value));
	$('#showmsg').html("<img src="+webdir+"skins/2011/images/loading.gif>");
	$.ajax({
	type:"post",
	cache:false,
	url:param,
	timeout:20000,
	error:function(){$('#showmsg').html(Ajax_msg);},
	success:function(t0)
	{
		$('#showmsg').html(t0.substring(1));
		if(t0.substring(0,1)==0){theform.username.value='';theform.content.value='';;$('#showmsg').html("<img src="+webdir+"skins/2011/images/loading.gif>发布成功");setTimeout("window.location.href='?';","3000");}
		}
	});
	return false
}

function checkLink(theform)
{  
	if (trim(theform.t0.value)=='')
	{   alert('网站不能为空');
		theform.t0.focus();
		theform.t0.value='';
		return false
	}
	if (trim(theform.t1.value)=='')
	{   alert('网址不能为空');
		theform.t1.focus();
		theform.t1.value='';
		return false
	}
	if (trim(theform.t3.value)=='')
	{   alert('验证码不能为空');
		theform.t3.focus();
		theform.t3.value='';
		return false
	}
	var param;
	param=webdir+"plug/link/index.asp?action=save";
	param+="&t0="+escape(trim(theform.t0.value));
	param+="&t1="+escape(trim(theform.t1.value));
	param+="&t2="+escape(trim(theform.t2.value));
	param+="&t3="+escape(trim(theform.t3.value));
	$('#showmsg').html("<img src="+webdir+"skins/2011/images/loading.gif>");
	$.ajax({
	type:"post",
	cache:false,
	url:param,
	timeout:20000,
	error:function(){$('#showmsg').html(param);},
	success:function(t0)
	{
		$('#showmsg').html(t0.substring(1));
		if(t0.substring(0,1)==0){theform.t0.value='';theform.t1.value='';theform.t2.value='';theform.t3.value='';$("#yzm_num")[0].src = $("#yzm_num")[0].src+"&"+Math.random();$('#showmsg').html(t0.substring(1));setTimeout("window.location.href='?';","1000");}
		}
	});
	return false
}

function checkvote(theform,t1)
{  
	var temp=""; 
	for(var i=0;i<theform.vote.length;i++) 
	{ 
	if(theform.vote[i].checked) 
	temp+=theform.vote[i].value+","; 
	}
	if(temp==""){
		$("#showvote").html("至少选择一个选项");
	return false
	}
	var param;
	param=webdir+"plug/vote/Index.asp?action=save";
	param+="&t0="+escape(trim(temp));
	param+="&id="+escape(trim(theform.vote_id.value));
	$('#showvote').html("<img src="+webdir+"skins/2011/images/loading.gif>");
	$.ajax({
	type:"post",
	cache:false,
	url:param,
	timeout:20000,
	error:function(){$('#showvote').html(Ajax_msg);},
	success:function(t0)
	{
		$('#showvote').html(t0.substring(1));
		if(t0.substring(0,1)==0){$('#showvote').html(t0.substring(1));if(t1==1){window.location.href='?id='+theform.vote_id.value+'';}}
		}
	});
	return false
}

function checkPublish(theform)
{  
	if (trim(theform.t0.value)=='')
	{   alert('标题不能为空');
		theform.t0.focus();
		theform.t0.value='';
		return false
	}
	if (trim(theform.t1.value)=='')
	{   alert('作者不能为空');
		theform.t1.focus();
		theform.t1.value='';
		return false
	}
	if (trim(theform.t2.value)=='')
	{   alert('来源不能为空');
		theform.t2.focus();
		theform.t2.value='';
		return false
	}
	if (trim(theform.t3.value)=='0')
	{   alert('请选择栏目');
		theform.t3.focus();
		return false
	}
	if (trim(editor.getSource())=='')
	{   alert('内容不能为空');
		editor.focus();
		editor.getSource('');
		return false
	}
	if (trim(theform.yzm.value)=='')
	{   alert('验证码不能为空');
		theform.yzm.focus();
		theform.yzm.value='';
		return false
	}
}

function pageInit()
{
	editor=$("#"+Editor_ID).xheditor({plugins:{
	Page:{c:'',t:'分页标签',h:0,e:function(){this.pasteHTML("$show_page$");
		}},Quote:{c:'',t:'引用代码',h:0,e:function(){
			var _this=this;
			var QuoteCode='<div>标题：<input id="xheQuoteType"></div><div>内容：<textarea id="xheQuoteValue" wrap="soft" spellcheck="false" style="width:300px;height:100px;" /></div><div style="text-align:right;"><input type="button" id="xheSave" value="确定" /></div>';			var QCode=$(QuoteCode),jType=$('#xheQuoteType',QCode),jValue=$('#xheQuoteValue',QCode),jSave=$('#xheSave',QCode);
			jSave.click(function(){
				_this.loadBookmark();
				if(jValue.val()!=""||jType.val()!=""){_this.pasteText('[Quote title="'+jType.val()+'"]\r\n'+jValue.val()+'\r\n[/Quote]');}
				_this.hidePanel();
				return false;	
			});
			_this.showDialog(QCode);
		}},Code:{c:'',t:'运行代码',h:0,e:function(){
			var _this=this;
			var QuoteCode='<div>请输入代码：<br><textarea id="xheQuoteValue" wrap="soft" spellcheck="false" style="width:300px;height:100px;" /></div><div style="text-align:right;"><input type="button" id="xheSave" value="确定" /></div>';			var QCode=$(QuoteCode),jValue=$('#xheQuoteValue',QCode),jSave=$('#xheSave',QCode);
			
			jSave.click(function(){
				_this.loadBookmark();
				if(jValue.val()!=""){_this.pasteText('[Code]\r\n'+jValue.val()+'\r\n[/Code]');}
				_this.hidePanel();
				return false;	
			});
			_this.showDialog(QCode);
		}},Flv:{c:'',t:'插入Flv视频',h:1,e:function(){
			var _this=this;
			var htmlFlv='<div>Flv文件:&nbsp; <input type="text" id="xheFlvUrl" value="http://" class="xheText" /></div><div>宽度高度: <input type="text" id="xheFlvWidth" style="width:40px;" value="480" /> x <input type="text" id="xheFlvHeight" style="width:40px;" value="400" /></div><div style="text-align:right;"><input type="button" id="xheSave" value="确定" /></div>';
			var jFlv=$(htmlFlv),jUrl=$('#xheFlvUrl',jFlv),jWidth=$('#xheFlvWidth',jFlv),jHeight=$('#xheFlvHeight',jFlv),jSave=$('#xheSave',jFlv);
			jSave.click(function(){
				_this.loadBookmark();
				_this.pasteText('[Flv width="'+jWidth.val()+'" height="'+jHeight.val()+'"]'+jUrl.val()+'[/Flv]');
				_this.hidePanel();
				return false;
			});
			_this.showDialog(jFlv);
		}}},
		tools:'Copy,Paste,Pastetext,Separator,Blocktag,Fontface,FontSize,FontColor,BackColor,Bold,Italic,Underline,Strikethrough,Removeformat,Source,Fullscreen,BtnBr,/,List,Outdent,Indent,Separator,Link,Unlink,Img,Flash,Media,Flv,Emot,Table,Page,Quote,Code,About',localUrl:'root'});
	editor=$('#'+Editor_ID)[0].xheditor;
}

//内容页复制网址
function copyurl(id){
var testCode=$("#"+id)[0].value;
	if(copy2Clipboard(testCode)!=false)
		{
			$("#"+id).select();
			alert("已复制，使用Ctrl+V粘贴出来发给你的朋友吧`");
		}
}
copy2Clipboard=function(txt)
{
if(window.clipboardData)
{
	window.clipboardData.clearData();
	window.clipboardData.setData("Text",txt);
}
else if(navigator.userAgent.indexOf("Opera")!=-1)
{
	window.location=txt;
}
else if(window.netscape)
{
	try{
	   netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	}
catch(e){
   alert("您的firefox安全限制限制您进行剪贴板操作，请打开'about:config'将signed.applets.codebase_principal_support'设置为true'之后重试。");
   return false;
}
var clip=Components.classes['@mozilla.org/widget/clipboard;1'].createInstance

(Components.interfaces.nsIClipboard);
if(!clip)return;
var trans=Components.classes['@mozilla.org/widget/transferable;1'].createInstance

(Components.interfaces.nsITransferable);
if(!trans)return;
trans.addDataFlavor('text/unicode');
var str=new Object();
var len=new Object();
var str=Components.classes["@mozilla.org/supports-string;1"].createInstance
(Components.interfaces.nsISupportsString);
var copytext=txt;str.data=copytext;
trans.setTransferData("text/unicode",str,copytext.length*2);
var clipid=Components.interfaces.nsIClipboard;
if(!clip)return false;
clip.setData(trans,null,clipid.kGlobalClipboard);
}
}