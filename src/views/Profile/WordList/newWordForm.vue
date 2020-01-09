<template>
  <b-form>
    <b-form-group
      id="input-group-test-01"
      label="Word"
      label-for="input-test-01">
      <b-form-input
        id="input-test-01"
        required
        placeholder="Enter something"/>
    </b-form-group>
    <b-form-group
      id="input-group-test-02"
      label="Take foto"
      label-for="input-test-02">
      <b-form-input
        id="input-test-02"
        required
        placeholder="Enter something else"/>
    </b-form-group>
    <p>
      tmp input:
    </p>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      word: null,
      image: null
    };
  }
};
</script>
