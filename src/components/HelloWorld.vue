<template>
  <h1>Заполните форму</h1>
  <div class="center-content">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="lastname"
              :counter="10"
              label="Last name"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="firstname"
              :counter="10"
              label="First name"
              required
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="middlename"
              :counter="10"
              label="Middle name"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="12">
            <v-text-field
              v-model="email"
              label="E-mail"
              hide-details
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-combobox
              clearable
              v-model="selectedItem"
              :items="['Монтаж', 'Демонтаж', 'Замер', 'Изготовление маскитных сеток', 'Замена стекло-пакетов', 'Ремонт фурнетуры']"
              label="Выберите услугу"
              variant="solo"
            ></v-combobox>
          </v-col>
        </v-row>

        <v-col cols="12" md="12">
          <v-btn
            :loading="loading"
            type="submit"
            block
            class="mt-2"
            text="Submit"
            @click="submitForm"
          ></v-btn>
        </v-col>
      </v-container>
      <v-alert v-if="errorMessage" type="error" @click="closeErrorMessage">
          {{ errorMessage }}
      </v-alert>
    </v-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      valid: false,
      lastname: "",
      firstname: "",
      middlename: "",
      email: "",
      selectedItem: null,
      errorMessage: "",
    };
  },
  methods: {
    checkForm() {
      if (!this.firstname || !this.lastname || !this.email || !this.selectedItem) {
        this.errorMessage = "Пожалуйста, заполните все обязательные поля";
      } else {
        this.errorMessage = "";
      }
    },
    closeErrorMessage() {
      this.errorMessage = "";
    },
    async submitForm() {
      this.checkForm();
      if (!this.errorMessage) {
        try {
          const response = await fetch("/api/form_quest_users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              firstname: this.firstname,
              middlename: this.middlename,
              lastname: this.lastname,
              email: this.email,
              selectedItem: this.selectedItem,
            }),
          });

          if (response.ok) {
            // Обработка успешной отправки данных
            alert("Заявка принята");
            this.lastname = "";
            this.firstname = "";
            this.middlename = "";
            this.email = "";
            this.selectedItem = null;
          } else {
            // Обработка ошибки
            this.errorMessage = "Произошла ошибка при отправке данных";
          }
        } catch (error) {
          console.error("Ошибка при отправке данных на сервер:", error);
          this.errorMessage = "Произошла ошибка при отправке данных";
        }
      }
    },
  },
};
</script>

<style>
.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>

