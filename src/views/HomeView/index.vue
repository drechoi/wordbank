<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="secondary">
      <b-navbar-brand to="/">
        <b-img src="static/favicon.png" height="30" alt="icon" />
        AppName
      </b-navbar-brand>
    </b-navbar>
    <b-container class="m-3">
      <b-card-group deck>
        <b-card no-body>
          <b-card-header>Existing Profile</b-card-header>
          <b-card-body>
            <b-dropdown text="--- Select profile ---"
                        block
                        variant="outline-secondary"
                        class="mb-1">
              <b-dropdown-item>existing profile</b-dropdown-item>
            </b-dropdown>
            <b-form-checkbox
              id="checkbox-1"
              name="checkbox-1"
              value="accepted"
              unchecked-value="not_accepted"
              class="mb-1"
            > Default
            </b-form-checkbox>
            <b-button block
                      to="/Profile"
                      variant="secondary">Enter</b-button>
          </b-card-body>
        </b-card>
        <b-card no-body>
          <b-card-header>Create New Profile</b-card-header>
          <b-card-body>
            <b-input placeholder="Enter a profile name" class="mb-1" />
            <b-form-checkbox
              id="checkbox-1"
              name="checkbox-1"
              value="accepted"
              unchecked-value="not_accepted"
              class="mb-1"
            > Default
            </b-form-checkbox>
            <b-button block to="/Profile" variant="secondary">Create new profile</b-button>
          </b-card-body>
        </b-card>
      </b-card-group>
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
