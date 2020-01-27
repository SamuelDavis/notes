<template>
  <notes-paper>
    <template v-slot:header>
      <h1>
        <notes-citation href="https://www.youtube.com/watch/?v=9NHrZTIHwKA">MySQL Query Optimization</notes-citation>
      </h1>
    </template>
    <section>
      <h3>Best Practices</h3>
      <ul>
        <li>Always have a primary key. If you omit a primary key, MySQL will automatically generate one.</li>
        <li>Create single indexes with multiple columns; order columns in indexes from left-to-right. The Primary Key is automatically added to custom indexes, so do not include it manually. Every index you create duplicates the primary key, so limit them.</li>
        <li>Index equality before ranges. When writing queries, try to use equality constraints first.</li>
        <li>Avoid duplicate indexes in tables and queries: <a href="https://www.percona.com/doc/percona-toolkit/LATEST/pt-duplicate-key-checker.html" target="_blank">pt-duplicate-key-checker</a></li>
        <li>Do not mix data types and do not rely on automatic type conversion. Type conversions will hobble the Optimizer.</li>
        <li>Negative clauses / subqueries are slower than positive clauses, eg. <code>IS NOT</code>, <code>NOT IN</code>, <code>NOT LIKE</code>.</li>
        <li>Prefer <code>INNER JOIN</code> to <code>LEFT JOIN</code>. <code>LEFT</code>, <code>RIGHT</code>, and <code>FULL</code> joins require scanning the entirety of their respective tables.</li>
        <li><code>UNION ALL</code> is preferable to multiple <code>UNION</code>s for the sake of the Optimizer.</li>
        <li><code>ORDER BY</code> can be slow; if you're ordering a very small amount of data, do it in the application.</li>
        <li><code>ORDER BY</code> and <code>LIMIT</code> will pull all of the data into memory; try to paginate in the application.</li>
        <li><a href="https://www.percona.com/blog/2018/05/02/proxysql-query-rewrite-use-case/">ProxySQL</a> allows you to rewrite queries when they reach the database.</li>
      </ul>
    </section>
    <section>
      <h3>Finding Slow Queries</h3>
      <ul>
        <li><a href="https://dev.mysql.com/doc/refman/8.0/en/slow-query-log.html" target="_blank">Slow Query Log</a>; <em>n <= 500ms</em> is the threshold for an unacceptably slow query.</li>
        <li>PMM/QAN</li>
        <li>Network sniff</li>
        <li>3rd Party Tooling; Vividcortext / Solarwinds / etc.</li>
      </ul>
    </section>
    <section>
      <h3>Debugging Slow Queries</h3>
      <ul>
        <li>MySQL supports the <a href="https://dev.mysql.com/doc/refman/8.0/en/explain.html" target="_blank"><code>EXPLAIN</code></a> statement which will reveal the steps taken to resolve a query.</li>
        <li>The <a href="https://dev.mysql.com/doc/refman/5.5/en/performance-schema.html" target="_blank">Performance Schema</a> tracks events in the MySQL engine and can provide various debug data.</li>
        <li>Running an <a href="https://dev.mysql.com/doc/internals/en/optimizer-tracing-typical-usage.html" target="_blank">Optimizer Trace</a> can tell you if the engine is using an Index Scan or a Full-Table Scan for a query.</li>
      </ul>
    </section>
    <section>
      <h3>PMM/QAN</h3>
      <h5><a href="https://www.percona.com/software/database-tools/percona-monitoring-and-management">Peracona Monitoring and Management</a> / <a href="https://www.percona.com/doc/percona-monitoring-and-management/qan.html">Query Analytics</a></h5>
      <p>PMM Qan is an analytics app which will reveal information like the load and latency on a system as a query is run, how many times any particular query is run, the fingerprint, and the <code>EXPLAIN</code>.</p>
    </section>
    <section>
      <h3>Slow Index Lookups</h3>
      <p>Indexes are maintained as a double-linked lists, binary tree data structure.</p>
      <ul>
        <li>Low cardinality / large data set; The point of working with indexes is to reduce the number of items to scan through.</li>
        <li>multiple index traversal; Scanning through more than one index can be slow.</li>
        <li>index column used as argument</li>
        <li>looking for suffix; Looking for a prefix is more common.</li>
        <li>non-leading column lookup</li>
        <li>data type mismatch; Do not mix data types. Do not store integers as their string counterparts.</li>
        <li>Character Set / Collation mismatch</li>
        <li>MySQL bug</li>
      </ul>
    </section>
    <section>
      <h3>The Optimizer</h3>
      <p><em>The Optimizer</em> is a MySQL daemon which statistically analyzes queries to optimize how joins should be executed.</p>
      <p>You can add <em>index hints</em>, globally or in query blocks, to help the optimizer guess which indexes to use.</p>
    </section>
  </notes-paper>
</template>

<script>
  import NotesPaper from '../../components/NotesPaper'
  import NotesCitation from '../../components/NotesCitation'

  export default {
    components: {
      NotesPaper,
      NotesCitation
    }
  }
</script>

<style scoped>

</style>
