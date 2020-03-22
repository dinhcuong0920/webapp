<template>
    <div>
        <b-button href="#" variant="outline-primary">
            <router-link to='/'>Home</router-link>
        </b-button>
        <b-form>
            <b-form-group id="input-group-1" label="Face" label-for="input-1">
                <b-form-file id="input-1"  type="file" required placeholder="Face">
                </b-form-file>
            </b-form-group>
            <b-form-group id="input-group-2" label="Passport" label-for="input-2">
                <b-form-file id="input-2"  required placeholder="Passport"></b-form-file>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>
    export default {

    }
</script>