function ready(fn)
{
	if(document.addEventListener)
	{		//��׼�����
		document.addEventListener('DOMContentLoaded',function()
		{
			//ע��ʱ�䣬�����ظ�����
			document.removeEventListener('DOMContentLoaded',arguments.callee,false);
			fn();		//���к���
		},false);
	}
	else if(document.attachEvent)
	{		//IE�����
		document.attachEvent('onreadystatechange',function()
		{
			if(document.readyState=='complete')
			{
				document.detachEvent('onreadystatechange',arguments.callee);
				fn();		//��������
			}
		});
	}
}