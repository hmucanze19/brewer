var Brewer = Brewer || {};

Brewer.EstiloCadastroRapido = (function() {
	function EstiloCadastroRapido() {
		this.modal = $("#modalEstiloCadastroRapido");
		this.botaoSalvar = this.modal.find(".js-modal-cadastro-estilo-btn");
		this.form = this.modal.find("form");
		this.inputNomeEstilo = $("#nomeEstilo");
		this.url = this.form.attr("action");
		this.containerMensagemErro = $(".js-container-mensagem-erro");
		this.formGroup = this.form.find(".form-group");
	}
	
	EstiloCadastroRapido.prototype.iniciar = function() {
		this.form.on("submit", function(event) { event.preventDefault() });
		this.modal.on("shown.bs.modal", onModalShow.bind(this));
		this.modal.on("hide.bs.modal", onModalClose.bind(this));
		this.botaoSalvar.on("click", onBotaoSalvarClick.bind(this));
	}
	
	function onModalShow() {
		this.inputNomeEstilo.focus();
	}
	
	function onModalClose() {
		this.inputNomeEstilo.val("");
		this.containerMensagemErro.addClass("hidden");
		this.formGroup.removeClass("has-error")
	}
	
	function onBotaoSalvarClick() {
		var nomeEstilo = this.inputNomeEstilo.val().trim();
		$.ajax({
			url: this.url,
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify({nome: nomeEstilo}),
			error: onErrorSalvandoEstilo.bind(this),
			success: onSalvarEstilo.bind(this)
		});
	}
	
	function onErrorSalvandoEstilo(obj) {
		var mensagemErro = obj.responseText;
		this.containerMensagemErro.removeClass("hidden");
		this.containerMensagemErro.html("<span>" + mensagemErro + "</span>");
		this.formGroup.addClass("has-error");
	}
	
	function onSalvarEstilo(estilo) {
		var comboEstilo = $("#estilo");
		comboEstilo.append("<option value=" + estilo.id + ">" + estilo.nome + "</option>");
		comboEstilo.val(estilo.id);
		this.modal.modal("hide");
	}
	
	return EstiloCadastroRapido;
}());

$(function() {
	var estiloCadastroRapido = new Brewer.EstiloCadastroRapido();
	estiloCadastroRapido.iniciar();
});