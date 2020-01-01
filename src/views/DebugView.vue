<template>
  <div>
    <b-container>
      This is Home View - Debug
      <ul>
        <li v-for="(route, index) in routes" :key="index">
          <b-link :to="route.path">{{ route.name }}</b-link>
        </li>
      </ul>
      <p>...
      </p>
    </b-container>
  </div>
</template>

<script>
import Router from '@/router/AllRoutes';

export default {
  data() {
    return {
      routes: Router
    };
  }
};

</script>
