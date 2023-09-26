<script>
export default {
  middleware ({ redirect }) {
    return redirect('301', '/events/page/1')
  }
}
</script>
