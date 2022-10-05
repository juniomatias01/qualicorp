<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    postSubmit: {
      type: Function,
    },
    putSubmit: {
      type: Function,
    },
  },
  data() {
    return {
      ufList: [],
      loading: false,
      cpfError: false,
      phoneError: false,
    };
  },
  methods: {
    handleSubmit() {
      if (this.user.cpf.length < 14) this.cpfError = true;
      else if (this.user.phone.length < 15) this.phoneError = true;
      else
        !this.user.id ? this.postSubmit(this.user) : this.putSubmit(this.user);
    },
  },
  mounted() {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((data) => {
        data.forEach((element) => {
          this.ufList.push(element.sigla);
        });
      })
      .catch((err) => console.warn(err));

    this.$refs.nameRef.focus();
  },
};
</script>

<template>
  <form @submit.prevent="handleSubmit" style="text-align: left">
    <label for="user.name">Name:</label>
    <input
      type="text"
      required
      :value="user.name"
      @input="(event) => (user.name = event.target.value)"
      ref="nameRef"
      id="user.name"
    />

    <label for="user.cpf">CPF:</label>
    <input
      type="text"
      required
      :value="user.cpf"
      @input="(event) => (user.cpf = event.target.value)"
      v-mask="'###.###.###-##'"
      placeholder="000.000.000-00"
      id="user.cpf"
    />
    <p v-if="cpfError && this.user.cpf.length < 14" class="error">
      Please enter full CPF
    </p>

    <label for="user.email">Email:</label>
    <input
      type="email"
      required
      :value="user.email"
      @input="(event) => (user.email = event.target.value)"
      id="user.email"
    />

    <label for="user.phone">Telefone:</label>
    <input
      required
      :value="user.phone"
      @input="(event) => (user.phone = event.target.value)"
      v-mask="'(##) #####-####'"
      placeholder="(00) 00000-0000"
      id="user.phone"
    />
    <p v-if="phoneError && this.user.phone.length < 15" class="error">
      Please provide the full number
    </p>

    <label for="user.uf">State: </label>
    <select
      :value="user.uf"
      @input="(event) => (user.uf = event.target.value)"
      required
      id="user.uf"
    >
      <option v-for="(value, index) in ufList" :key="index" :value="value">
        {{ value }}
      </option>
    </select>
    <div class="centered-text">
      <button v-if="this.user.id">Update Client</button>
      <button v-else>Register Customer</button>
    </div>
  </form>
</template>
