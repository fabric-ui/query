import React from "react";

export default {
   required: 'Esse campo é obrigatório.',
   nothing: 'Nada selecionado.',
   clean: 'Limpar seleção',
   reload: 'Recarregar dados',
   settings: 'Configurações',
   extended: 'Estendido',
   minimal: 'Mínimo',
   all: 'Todos',
   visible: 'Visível',
   allHidden: 'Todos os campos estão escondidos',
   allVisible: 'Todos os campos estão visíveis',
   hidden: 'Escondido',
   image: 'Imagem',

   yes: 'Sim',
   no: 'Não',

   page: (c, p) => {
      return `Página ${c} de ${p} carregadas`
   },
   greaterThan: 'Maior que',
   lessThan: 'Menor que',
   equalTo: 'Igual a',
   notEqual: 'Diferente',
   contain: 'Contém',
   apply: 'Aplicar',

   error: 'Algum erro ocorreu',
   success: 'Sucesso'
}
