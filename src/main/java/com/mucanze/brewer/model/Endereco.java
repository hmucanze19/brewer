package com.mucanze.brewer.model;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

@Embeddable
public class Endereco {
	
	private String logradouro;
	private String numero;
	private String complemento;
	private String cep;
	
	@NotNull(message = "Cidade é obrigatório")
	@ManyToOne
	@JoinColumn(name = "cidade_id")
	private Cidade cidade;
	
	@Transient
	private Estado estado;
	
	public String getLogradouro() {
		return logradouro;
	}
	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}
	public String getNumero() {
		return numero;
	}
	public void setNumero(String numero) {
		this.numero = numero;
	}
	public String getComplemento() {
		return complemento;
	}
	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}
	public String getCep() {
		return cep;
	}
	public void setCep(String cep) {
		this.cep = cep;
	}
	public Cidade getCidade() {
		return cidade;
	}
	public void setCidade(Cidade cidade) {
		this.cidade = cidade;
	}
	public Estado getEstado() {
		return estado;
	}
	public void setEstado(Estado estado) {
		this.estado = estado;
	}
	
	public String getNomeCidadeEstado() {
		if(this.cidade != null) {
			return this.cidade.getNome() + " - " + this.cidade.getEstado().getNome();
		}
		return null;
	}
	
}
