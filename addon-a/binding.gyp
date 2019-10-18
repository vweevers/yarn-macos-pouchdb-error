{
  "targets": [{
    "target_name": "addon_a",
    "include_dirs": [
      "<!(node -e \"require('napi-macros')\")"
    ],
    "sources": [
      "../binding.cc"
    ]
  }]
}
