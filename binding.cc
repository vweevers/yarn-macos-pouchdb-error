#define NAPI_VERSION 3

#include <napi-macros.h>
#include <node_api.h>
#include <stdio.h>

#define STRINGIZE(x) #x
#define STRING(x) STRINGIZE(x)
#define PRINT(name) printf(STRING(NODE_GYP_MODULE_NAME) " " #name "\n");

static napi_status CallFunction (napi_env env,
                                 napi_value callback,
                                 const int argc,
                                 napi_value* argv) {
  napi_value global;
  napi_get_global(env, &global);
  return napi_call_function(env, global, callback, argc, argv, NULL);
}

struct BaseWorker {
  BaseWorker (napi_env env, napi_value callback) : env_(env) {
    NAPI_STATUS_THROWS_VOID(napi_create_reference(env_, callback, 1, &callbackRef_));
    napi_value asyncResourceName;
    NAPI_STATUS_THROWS_VOID(napi_create_string_utf8(env_, "baseworker",
                                               NAPI_AUTO_LENGTH,
                                               &asyncResourceName));
    NAPI_STATUS_THROWS_VOID(napi_create_async_work(env_, callback,
                                              asyncResourceName,
                                              BaseWorker::Execute,
                                              BaseWorker::Complete,
                                              this, &asyncWork_));
  }

  ~BaseWorker () {
    napi_delete_reference(env_, callbackRef_);
    napi_delete_async_work(env_, asyncWork_);
  }

  static void Execute (napi_env env, void* data) {
    PRINT(execute);
    BaseWorker* self = (BaseWorker*)data;
  }

  static void Complete (napi_env env, napi_status status, void* data) {
    PRINT(complete);
    BaseWorker* self = (BaseWorker*)data;
    self->DoComplete();
    delete self;
  }

  void DoComplete () {
    napi_value argv;
    napi_get_null(env_, &argv);
    napi_value callback;
    napi_get_reference_value(env_, callbackRef_, &callback);
    CallFunction(env_, callback, 1, &argv);
  }

  void Queue () {
    napi_queue_async_work(env_, asyncWork_);
  }

  napi_env env_;
  napi_ref callbackRef_;
  napi_async_work asyncWork_;
};

NAPI_METHOD(test) {
  NAPI_ARGV(1);
  napi_value callback = argv[0];

  BaseWorker* worker = new BaseWorker(env, callback);
  worker->Queue();

  return 0;
}

NAPI_INIT() {
  NAPI_EXPORT_FUNCTION(test);
};
